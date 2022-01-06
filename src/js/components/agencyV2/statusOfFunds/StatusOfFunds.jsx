/**
 * StatusOfFunds.jsx
 * Created by Lizzie Salita 10/27/21
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FlexGridRow, FlexGridCol, Pagination, LoadingMessage } from 'data-transparency-ui';
import { setSelectedSubcomponent, setAgencySubcomponents, resetAgencySubcomponents, setFederalAccountsList, resetFederalAccountsList } from 'redux/actions/agencyV2/agencyV2Actions';
import { fetchSubcomponentsList, fetchFederalAccountsList } from 'apis/agencyV2';
import { parseRows } from 'helpers/agencyV2/StatusOfFundsVizHelper';
import { useStateWithPrevious } from 'helpers';
import BaseStatusOfFundsLevel from 'models/v2/agency/BaseStatusOfFundsLevel';
import Note from 'components/sharedComponents/Note';
import DrilldownSidebar from './DrilldownSidebar';
import VisualizationSection from './VisualizationSection';
import IntroSection from './IntroSection';

const propTypes = {
    fy: PropTypes.string
};

export const levels = ['Sub-Component', 'Federal Account'];

const StatusOfFunds = ({ fy }) => {
    const dispatch = useDispatch();
    const [level, setLevel] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [subcomponent, setSubcomponent] = useState({});
    const [prevPage, currentPage, changeCurrentPage] = useStateWithPrevious(1);
    const [prevPageSize, pageSize, changePageSize] = useStateWithPrevious(10);
    const [totalItems, setTotalItems] = useState(0);
    const request = useRef(null);
    const [results, setResults] = useState([]);
    const { overview, selectedSubcomponent } = useSelector((state) => state.agencyV2);

    useEffect(() => {
        if (request.current) {
            request.current.cancel();
        }

        dispatch(resetAgencySubcomponents());
        dispatch(resetFederalAccountsList());
    }, []);

    const fetchAgencySubcomponents = () => {
        if (request.current) {
            request.current.cancel();
        }
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        const params = {
            limit: pageSize,
            page: currentPage
        };
        request.current = fetchSubcomponentsList(overview.toptierCode, fy, params.page);
        const agencySubcomponentsListRequest = request.current;
        if (!overview.toptierCode) {
            console.log('debug subcomponent');
        }
        agencySubcomponentsListRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                setResults(parsedData);
                dispatch(setAgencySubcomponents(parsedData));
                setTotalItems(res.data.page_metadata.total);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    const fetchFederalAccounts = (agencyData) => {
        console.log('agencydata', agencyData);
        if (request.current) {
            request.current.cancel();
        }
        console.log('agencydataReq', agencyData);
        if (error) {
            setError(false);
        }
        if (!loading) {
            setLoading(true);
        }
        const params = {
            limit: pageSize,
            page: currentPage
        };
        request.current = fetchFederalAccountsList(overview.toptierCode, agencyData.id, fy, params.page);
        const federalAccountsRequest = request.current;
        federalAccountsRequest.promise
            .then((res) => {
                const parsedData = parseRows(res.data.results);
                console.log(agencyData.id);
                const totalsData = {
                    name: `${agencyData.name}`,
                    id: `${agencyData.id}`,
                    total_budgetary_resources: `${agencyData.budgetaryResources}`,
                    total_obligations: `${agencyData.obligations}`
                };
                setLevel(1, totalsData);
                setResults(parsedData);
                dispatch(setFederalAccountsList(parsedData));
                setTotalItems(res.data.page_metadata.total);
                console.log(res.data);
                setLoading(false);
            }).catch((err) => {
                setError(true);
                setLoading(false);
                console.error(err);
            });
    };

    useEffect(() => {
        if (Object.keys(subcomponent).length !== 0) {
            fetchFederalAccounts(subcomponent);
        }
    }, [subcomponent]);

    useEffect(() => {
        if (level === 0) {
            fetchAgencySubcomponents();
        }
        if (level === 1) {
            fetchFederalAccounts(subcomponent);
        }
    }, [currentPage]);

    useEffect(() => {
        if (fy && overview.toptierCode) {
            fetchAgencySubcomponents();
        }
    }, [fy, overview.toptierCode]);

    const onClick = (selectedLevel, data) => {
        const subcomponentTotalData = Object.create(BaseStatusOfFundsLevel);
        subcomponentTotalData.populate(data);
        dispatch(setSelectedSubcomponent(subcomponentTotalData));
        console.log('sub', subcomponentTotalData);
        setSubcomponent(subcomponentTotalData);
    };

    const goBack = () => {
        if (overview.toptierCode) {
            setLevel(0);
            fetchAgencySubcomponents();
        }
    };
    return (
        <div className="body__content status-of-funds">
            <IntroSection name={overview.name} fy={fy} totalItems={totalItems} />
            <FlexGridRow hasGutter>
                <FlexGridCol className="status-of-funds__drilldown-sidebar" desktop={3}>
                    <DrilldownSidebar
                        level={level}
                        setLevel={onClick}
                        agencyName={overview.name}
                        fy={fy}
                        selectedSubcomponent={selectedSubcomponent} />
                </FlexGridCol>
                <FlexGridCol className="status-of-funds__visualization" desktop={9}>
                    {level === 1 ?
                        <button onClick={goBack}>
                            Back
                        </button> : <></>}
                    { !loading ? <VisualizationSection fetchFederalAccounts={fetchFederalAccounts} totalItems={totalItems} setTotalItems={setTotalItems} loading={loading} setLoading={setLoading} level={level} setLevel={onClick} selectedSubcomponent={selectedSubcomponent} agencyId={overview.toptierCode} agencyName={overview.name} fy={fy} results={results} /> : <LoadingMessage /> }
                    <Pagination
                        currentPage={currentPage}
                        changePage={changeCurrentPage}
                        changeLimit={changePageSize}
                        resultsText
                        pageSize={10}
                        totalItems={totalItems} />
                </FlexGridCol>
            </FlexGridRow>
            <Note message={
                (<>The agency sub-components displayed in this section were
                    added to provide greater transparency into the organization of agencies’
                    account data. These sub-components are based on the Bureau associated
                    with a federal account in OMB’s Master Accounts Title file.
                    Sub-components are identified using Agency Identifier (AID) codes.
                    Department of Defense (DoD) sub-components
                    correspond to the branches of the Armed Forces and accounts for the
                    agency are attributed to the appropriate branch/sub-component based on
                    the Agency Codes found at the bottom of{ ' ' }
                    <a
                        href="https://www.whitehouse.gov/wp-content/uploads/2018/06/app_c.pdf"
                        target="_blank"
                        rel="noopener noreferrer">
                        OMB Circular A-11 Appendix C
                    </a>.</>)} />
        </div>
    );
};

StatusOfFunds.propTypes = propTypes;
export default StatusOfFunds;
