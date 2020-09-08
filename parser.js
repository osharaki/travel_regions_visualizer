/**
 * 
 * @param {[]} rows: Array made up of rows from a parsed CSV file. Typically the data attribute of Papa.parse's response.
 * @param {int} communityLevel: Specifies the position in the community hierarchy, corresponding to the headers community_1, community_2, etc.
 * @param {int} communityId: Specifies the cluster within the community.
 * @returns {[]} An int array of the form [latitude, longitude, communityLevel]
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