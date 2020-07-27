/**
 * SidebarFooter.jsx
 * Created by James Lee 7/17/20
 */

import React, { createRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDynamicStickyClass } from '../sharedComponents/stickyHeader/StickyHeader';

const propTypes = {
    pageName: PropTypes.string,
    fixedStickyBreakpoint: PropTypes.number

};

const referenceDiv = createRef();
const div = createRef();

function SidebarFooter(props) {
    const [isSidebarSticky, , , handleScroll] = useDynamicStickyClass(referenceDiv, props.fixedStickyBreakpoint);
    const [sidebarFooterWidth, setSidebarFooterWidth] = useState("auto");
    const [sidebarFooterTop, setSidebarFooterTop] = useState("auto");

    useEffect(() => {
        const updateSidebarFooterWidthAndTop = throttle(() => {
            if (isSidebarSticky && sidebarFooterWidth !== referenceDiv.current.offsetWidth) {
                const sidebarDomElement = document.getElementsByClassName(`${props.pageName}-sidebar-content`);
                setSidebarFooterWidth(`${referenceDiv.current.offsetWidth}px`);
                setSidebarFooterTop(`${(sidebarDomElement[0].offsetHeight + props.fixedStickyBreakpoint)}px`);
            }
            else if (!isSidebarSticky && sidebarFooterWidth !== div.current.offsetWidth) {
                setSidebarFooterWidth(`auto`);
                setSidebarFooterTop(`auto`);
            }
        }, 100);
        updateSidebarFooterWidthAndTop();
        window.addEventListener('resize', updateSidebarFooterWidthAndTop);

        return () => {
            window.removeEventListener('resize', updateSidebarFooterWidthAndTop);
        };
    }, [sidebarFooterWidth, setSidebarFooterWidth, isSidebarSticky]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const floatSidebarFooter = isSidebarSticky
        ? 'float-sidebar-footer'
        : '';

    return (
        <div>
            <div className={`${props.pageName}-sidebar-footer-reference ${floatSidebarFooter}`} ref={referenceDiv}>
                &nbsp;
            </div>
            <div ref={div} className={`${props.pageName}-sidebar-footer ${floatSidebarFooter}`} style={{ width: sidebarFooterWidth, top: sidebarFooterTop }}>
                <div className={`${props.pageName}-sidebar-footer__header`}>Learn more about <b>The Federal Response to COVID-19</b> at Data Lab!</div>
                <div className={`${props.pageName}-sidebar-footer__content`}>
                    Visit our sister site,&nbsp;
                    <a href="https://datalab.usaspending.gov/federal-covid-spending/">
                        <b>DATA Lab &nbsp;
                            <FontAwesomeIcon size="sm" icon="external-link-alt" />
                        </b>
                    </a>, to see more ways the government is providing financial relief and explore how funding makes its way from Congress to the economy.

                </div>
            </div>
        </div>
    );
}

export default SidebarFooter;
SidebarFooter.propTypes = propTypes;
