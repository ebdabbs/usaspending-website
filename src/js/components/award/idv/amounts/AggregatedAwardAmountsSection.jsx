/**
 * AggregatedAwardAmounts.jsx
 * Created by David Trinh 2/8/19
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { formatNumber } from 'helpers/moneyFormatter';

import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import ChartError from 'components/search/visualizations/ChartError';
import AwardsBanner from './AwardsBanner';
import { AWARD_AGGREGATED_AMOUNTS_PROPS } from '../../../../propTypes';
import AwardAmountsTable from '../../shared/awardAmounts/AwardAmountsTable';
import AwardAmountsChart from '../../shared/awardAmounts/AwardAmountsChart';
import JumpToSectionButton from '../../shared/awardAmounts/JumpToSectionButton';

const propTypes = {
    awardAmounts: AWARD_AGGREGATED_AMOUNTS_PROPS,
    inFlight: PropTypes.bool,
    error: PropTypes.bool,
    showFileC: PropTypes.bool,
    jumpToSection: PropTypes.func
};


export default class AggregatedAwardAmounts extends React.Component {
    constructor(props) {
        super(props);
        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }

    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }

    render() {
        if (this.props.inFlight) {
            // API request is still pending
            return (
                <div className="visualization-message-container">
                    <div className="visualization-loading">
                        <div className="message">
                            Gathering your data...
                        </div>
                    </div>
                </div>);
        }
        else if (this.props.error) {
            return (<ChartError />);
        }

        const { awardAmounts } = this.props;
        const spendingScenario = determineSpendingScenarioByAwardType("idv", awardAmounts);
        return (
            <div className="award-amounts__content">
                <AwardsBanner
                    jumpToReferencedAwardsTable={this.jumpToReferencedAwardsTable} />
                <AwardAmountsChart
                    showCaresActViz={this.props.showFileC}
                    awardOverview={awardAmounts}
                    awardType="idv"
                    spendingScenario={spendingScenario} />
                <AwardAmountsTable
                    awardAmountType="idv_aggregated"
                    showFileC={this.props.showFileC}
                    awardData={awardAmounts}
                    spendingScenario={spendingScenario} />
                <div className="award-amounts-children__data-wrapper">
                    <span className="title-and-link-span">
                        <p className="count-of-awards-title-text"><strong>Count of Awards Under this IDV</strong></p>
                        <JumpToSectionButton
                            linkText="View table of awards under this IDV"
                            onClick={this.jumpToReferencedAwardsTable}
                            icon="table" />
                    </span>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Child Contracts</div>
                        <span>{formatNumber(awardAmounts.childAwardCount)}</span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Child IDVs</div>
                        <span>
                            {formatNumber(awardAmounts.childIDVCount)}
                        </span>
                    </div>
                    <div className="award-amounts-children__data-content">
                        <div>Count of Grandchild Contracts</div>
                        <span>{formatNumber(awardAmounts.grandchildAwardCount)}</span>
                    </div>
                    <p className="total-title-text"><strong>Total: </strong>{`${formatNumber(awardAmounts.grandchildAwardCount + awardAmounts.childAwardCount + awardAmounts.childIDVCount)}`}</p>
                </div>
            </div>
        );
    }
}

AggregatedAwardAmounts.propTypes = propTypes;

