const Media =  require('../models/media');

/**
 * List All Files
 */
exports.list = (req, h) => {
  return Media.find({}).exec().then((media) => {
    return { media };
  }).catch((err) => {
    return { err: err };
  });
}

/**
 * Get Media by Id
 */
exports.get = (req, h) => {

  return Media.findById(req.params.id).exec().then((media) => {

    if (!media) return { message: 'File not Found' };

    return { media };

  }).catch((err) => {
    return { err: err };
  });
}


/**
 * POST Media
 */
exports.create = (req, h) => {
  const { title, description, recordedAt, image } = req.payload;
  
  const mediaData = { title, description, recordedAt, image };

  return Media.create(mediaData).then((media) => {
     return { media };
  }).catch((err) => {
    return { err: err };
  });
}

/**
 * PUT | Update Dog by ID
 */
exports.update = (req, h) => {
  return Media.findById(req.params.id).exec().then((media) => {

    if (!media) return { err: 'Media not found' };

    const { title, description, recordedAt, image } = req.payload;
    media.title = title;
    media.description = description;
    media.recordedAt = recordedAt;
    media.image = image;
    media.save();
  }).then((data) => {
      return { message: "Media data updated successfully" };
  }).catch((err) => {
      return { err: err };
  });
}

/**
 * Delete Media by ID
 */
exports.remove = (req, h) => {

  return Media.findById(req.params.id).exec((err, media) => {

    if (err) return { dberror: err };
    if (!media) return { message: 'Media not found' };

    media.remove((err) => {
      if (err) return { dberror: err };
      return { success: true };
    });
  });
}