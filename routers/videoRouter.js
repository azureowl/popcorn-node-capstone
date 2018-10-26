const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const id = 'rj7xMBxd5iY';
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('getting all videos!');
    // send back watchlist and generate with thumbnail and id
    res.json({id, thumbnail, desc});
});

// send back time to sync up viewers

router.get('/:term', (req, res) => {
    const filter = 'items(id,snippet/title,snippet/thumbnails),nextPageToken,pageInfo';
    const term = req.params.term;
    console.log(term);
    request('https://www.googleapis.com/youtube/v3/search', {
        json: true,
        qs: {
            part: 'snippet',
            q: term,
            key: YT_key,
            fields: filter
        }
    }, function (err, response, body) {
        if (!err && response.statusCode === 200) {
            console.log('searching for videos!');
            res.json({response});
        } else {
            console.log(err);
            res.json(err);
        }
    });
});

// Add video to watchlist collection
router.post('/:id', (req, res) => {
    const id = req.params.id;
    const thumbnail = "image.png";
    const desc = "lorem ipsum";

    console.log('adding video!');
    res.status(201).json({id, thumbnail, desc});
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    console.log('deleting video!');
    res.status(204).end();
});

module.exports = router;
