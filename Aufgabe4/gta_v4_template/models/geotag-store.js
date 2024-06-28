// File origin: VS1LAB A3

/**
 * This script is a template for exercise VS1lab/Aufgabe3
 * Complete all TODOs in the code documentation.
 */

/**
 * A class for in-memory-storage of geotags
 * 
 * Use an array to store a multiset of geotags.
 * - The array must not be accessible from outside the store.
 * 
 * Provide a method 'addGeoTag' to add a geotag to the store.
 * 
 * Provide a method 'removeGeoTag' to delete geo-tags from the store by name.
 * 
 * Provide a method 'getNearbyGeoTags' that returns all geotags in the proximity of a location.
 * - The location is given as a parameter.
 * - The proximity is computed by means of a radius around the location.
 * 
 * Provide a method 'searchNearbyGeoTags' that returns all geotags in the proximity of a location that match a keyword.
 * - The proximity constrained is the same as for 'getNearbyGeoTags'.
 * - Keyword matching should include partial matches from name or hashtag fields. 
 */
class InMemoryGeoTagStore {
    #geotags = [];
    #id = 0;

    /**
     * Add a Geotag to the store.
     * @param {GeoTag} GeoTag Geotag object to add to the store
     * *@returns The ID of the Geotag that has just been added
     */
    addGeoTag(geotag) {
        geotag.id = this.#id;
        this.#geotags.push(geotag);
        this.#id += 1;
        return this.#id - 1;
    }

    /**
     * *Find a stored Geotag with the given ID.
     * @param {number} id ID of the Geotag to look for
     * @returns Geotag with the given ID or undefined if there is no Geotag with this ID
     */
    getGeoTagById(id) {
        return this.#geotags.find(geotag => geotag.id == id);
    }

    /**
     * *Replace an existing Geotag by ID.
     * @param {number} id ID of the Geotag to update
     * @param {GeoTag} geotag Complete Geotag object to replace the existing one with
     * @returns The new Geotag
     */
    updateGeoTagById(id, geotag) {
        this.removeGeoTagById(id);
        geotag.id = id;
        this.#geotags.push(geotag);
        return geotag;
    }

    /**
     * Remove a Geotag from the store by name.
     * @param {string} name Name of the Geotag to delete
     */
    removeGeoTag(name) {
        this.#geotags = this.#geotags.filter(geotag => geotag.name !== name);
    }

    /**
     * *Remove a Geotag from the story by ID.
     * @param {number} id ID of the GeoTag to remove
     */
    removeGeoTagById(id) {
        this.#geotags = this.#geotags.filter(geotag => geotag.id != id);
    }

    /**
     * Find all geotags within the `radius` of the location defined by `latitude` and `longitude`.
     * @param {number} latitude Latitude of the centerpoint
     * @param {number} longitude Longitude of the centerpoint
     * @param {number} radius Search radius in meters
     * @returns List of all Geotags within the distance of the location.
     */
    getNearbyGeoTags(latitude, longitude, radius = 2000) {
        return this.#geotags.filter(geotag => this.#haversine_distance(latitude, longitude, geotag.latitude, geotag.longitude) <= radius);
    }

    /**
     * *Find all Geotags that include the search term in their name or hashtag (case-insensitive).
     * @param {string} searchTerm Keyword to search for
     * @returns List of Geotags that contain the search term in their name or hashtag
     */
    searchGeoTags(searchTerm) {
        return this.#geotags.filter((geotag) =>
            geotag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            geotag.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    /**
     * Find all geotags within the `radius` of the location defined by `latitude` and `longitude`
     * and that contain the `searchTerm` in the name or hashtags (case-insensitive).
     * @param {number} latitude Latitude of the centerpoint
     * @param {number} longitude Longitude of the centerpoint
     * @param {number} radius Search radius in meters
     * @param {string} searchTerm Keyword to search for
     * @returns List of Geotags within the distance of the location that match the keyword
     */
    searchNearbyGeoTags(latitude, longitude, radius, searchTerm) {
        return this.getNearbyGeoTags(latitude, longitude, radius).filter((geotag) =>
            geotag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            geotag.hashtag.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    /**
     * Return all Geotags that are saved in the store.
     * @returns A list of all Geotags saved in the store
     */
    getAllGeoTags() {
        return this.#geotags;
    }

    /**
     * Calculate the distance between two locations given as decimal degree coordinates.
     * Uses the Haversine formula to account for curvature of the earth: https://en.wikipedia.org/wiki/Haversine_formula
     * @param {number} lat1 Latitude of the first point
     * @param {number} lon1 Longitude of the first point
     * @param {number} lat2 Latitude of the first point
     * @param {number} lon2 Longitude of the first point
     * @returns Distance between the two points
     */
    #haversine_distance(lat1, lon1, lat2, lon2) {
        var earthRadius = 6378.137;
        var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = earthRadius * c;
        return d * 1000;
    }
}

module.exports = InMemoryGeoTagStore