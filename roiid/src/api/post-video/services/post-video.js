'use strict';

/**
 * post-video service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::post-video.post-video');
