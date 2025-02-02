/**
 * WithAgencySlugs-test.js
 * Created by Lizzie Salita 11/8/21
* */

import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from 'test-utils';
import * as redux from 'react-redux';
import * as api from 'apis/agencyV2';
import * as actions from 'redux/actions/agencyV2/agencyV2Actions';

import { mapSlugToTopTierCode, mapTopTierCodeToSlug, useAgencySlugs } from 'containers/agencyV2/WithAgencySlugs';
import { mapIdToSlug } from "../../../src/js/containers/agencyV2/WithAgencySlugs";

let mockFetch;
let mockUseSelector;
let mockAction;

const mockAPIResponse = {
    results: [
        {
            toptier_code: "123",
            agency_slug: "department-of-sandwiches",
            agency_id: "12"
        },
        {
            toptier_code: "456",
            agency_slug: "ministry-of-magic",
            agency_id: "23"
        }
    ]
};

const mockSlugsMapping = {
    'department-of-sandwiches': '123',
    'ministry-of-magic': '456'
};

const mockTopTierMapping = {
    123: 'department-of-sandwiches',
    456: 'ministry-of-magic'
};

const mockIdMapping = {
    12: 'department-of-sandwiches',
    23: 'ministry-of-magic'
};

beforeEach(() => {
    jest.spyOn(redux, 'useDispatch').mockReturnValue(() => (fn) => fn()).mockClear();
    mockFetch = jest.spyOn(api, 'fetchAgencySlugs').mockReturnValue({
        promise: Promise.resolve({ data: mockAPIResponse }),
        cancel: () => jest.fn()
    }).mockClear();
    mockUseSelector = jest.spyOn(redux, 'useSelector').mockReturnValue({ agencySlugs: {} }).mockClear();
    mockAction = jest.spyOn(actions, 'setAgencySlugs').mockClear();
});

test('useAgencySlugs: fetches agency slugs when they are not populated', async () => {
    renderHook(() => useAgencySlugs());
    expect(mockFetch).toHaveBeenCalledTimes(1);
    await waitFor(() => {
        expect(mockAction).toHaveBeenCalledWith(mockSlugsMapping, mockTopTierMapping, mockIdMapping);
    });
});

test('useAgencySlugs: does not fetch agency slugs when they are populated', () => {
    mockUseSelector.mockReturnValue({ agencySlugs: mockSlugsMapping });
    const { result } = renderHook(() => useAgencySlugs());
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(result.current[0]).toEqual(mockSlugsMapping);
});

test('mapSlugToTopTierCode: returns a mapping of agency_slug: toptier_code', () => {
    const result = mapSlugToTopTierCode(mockAPIResponse.results);
    expect(result).toEqual(mockSlugsMapping);
});

test('mapTopTierCodeToSlug: returns a mapping of toptier_code: agency_slug', () => {
    const result = mapTopTierCodeToSlug(mockAPIResponse.results);
    expect(result).toEqual(mockTopTierMapping);
});

test('mapIdToSlug: returns a mapping of agency_id: agency_slug', () => {
    const result = mapIdToSlug(mockAPIResponse.results);
    expect(result).toEqual(mockIdMapping);
});
