// @ts-check

/**
 * Retrieves the coordinates of locations matching certain criteria.
 * @param {Object<string, string>[]} rows Array of objects with keys 'community_1, community_2, community_3, community_4, community_5, community_6, country_code,latitude, longitude, place_name'. Typically the data attribute of Papa.parse's response.
 * @param {number} [communityLevel=1] Specifies the position in the community hierarchy, corresponding to the headers community_1, community_2, etc.
 * @param {number} [communityId] Specifies the cluster within the community.
 * @returns {number[][]} An array of the form [latitude, longitude, communityLevel].
 */
function getCoordinates(rows, communityLevel = 1, communityId) {
    const locs = [];
    for (const row of rows) {
        if (row['latitude'] && row['longitude']) {
            if (communityId === undefined) { // user wants the coordinates of locations regardless of cluster
                locs.push([parseFloat(row['latitude']), parseFloat(row['longitude']), parseFloat(row[`community_${communityLevel}`])]);
                continue;
            }
            let entryCommunityId = row[`community_${communityLevel}`];
            if (entryCommunityId === communityId.toString()) {
                locs.push([parseFloat(row['latitude']), parseFloat(row['longitude']), parseFloat(row[`community_${communityLevel}`])]);
            }
        }
    }
    return locs;
}

/**
 * Retrieves locations matching certain criteria
 * @param {Object<string, string>[]} rows Array of objects with keys 'community_1, community_2, community_3, community_4, community_5, community_6, country_code,latitude, longitude, place_name'. Typically the data attribute of Papa.parse's response.
 * @param {number} [communityLevel=1] Specifies the position in the community hierarchy, corresponding to the headers community_1, community_2, etc.
 * @param {number} [communityId] Specifies the cluster within the community. Returns all clusters if ommited. Returns all clusters if ommited.
 * @returns {Object<string, string>[]} The matching rows.
 */
function filterRows(rows, communityLevel = 1, communityId) {
    const matchingRows = [];
    for (const row of rows) {
        if (communityId === undefined) { // user wants the coordinates of locations regardless of cluster
            matchingRows.push(row);
            continue;
        }
        let entryCommunityId = row[`community_${communityLevel}`];
        if (entryCommunityId === communityId.toString()) {
            matchingRows.push(row);
        }
    }
    return matchingRows;
}