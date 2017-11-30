const Cheaters = require('../models/cheaters');
const Bugs = require('../models/bugs');
const lodash = require('lodash');
const moment = require('moment');

/*********************************************
display all cheaters
*********************************************/
exports.index = function(req, res, next){
    Cheaters.find({}, '_id title description code created_by date_created name', { sort: {'_id': -1}})
    .where('name').equals(req.query.name)
    .exec(function(err, cheaters) {
        if (err) {
            console.log(err + 'error getting cheaters');
        } else {
            console.log(cheaters + 'success')
            res.json(cheaters);
        }
    })
    //console.log(req.query.name);

}
/********************************************
add new cheatsheet
********************************************/
exports.create_cheat = function(req, res, next) {
    req.checkBody('title', 'Title must not be empty').notEmpty();
    req.checkBody('description', 'Description must not be empty').notEmpty();
    req.checkBody('code', 'Code name must not be empty').notEmpty();
    req.checkBody('name', 'Name must not be empty').notEmpty();

    //sanitize
    req.sanitize('title').escape();
    req.sanitize('description').escape();
    //req.sanitize('code').escape();
    req.sanitize('name').escape();

    req.sanitize('title').trim();
    req.sanitize('description').trim();
    //req.sanitize('code').trim();
    req.sanitize('name').trim();

    const cheater = new Cheaters({
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        name: req.body.name,
        created_by: 'me'
        //date_created:
    });

    console.log('Cheaters', cheater);

    let errors = req.validationErrors();

    if (errors) {
        console.log(errors, 'error occured');
        res.json(errors)
    } else {
        cheater.save(function(err) {
            if (err) {
                return next(err);
            }
            console.log("o so nice");
            res.json('fuck');
        })
    }
}
/**********************************
get cheaters names
**********************************/
exports.getcheaternames = function(req, res, next) {
    Cheaters.distinct('name')
    .exec(function(err, cheater_names) {
        if(err) {
            return next(err);
        }
        res.json(cheater_names);
        console.log(cheater_names,'cheater names');
    })
}

/**********************************
delete cheater
**********************************/
exports.deleteCheater = function(req, res, next) {
    console.log(req.body.id, 'id');
    Cheaters.findByIdAndRemove(req.body.id, function(err) {
        if(err) {
            return next(err);
        }
        res.json("success");
    })
}

/*********************************
edit cheater
*********************************/
exports.editCheater = function(req, res, next) {
    console.log(req.body,'body')
    const cheater = new Cheaters(
        {
            title: req.body.title,
            _id: req.body.id,
            description: req.body.description,
            name: req.body.name,
            code: req.body.code
        }
    )
    Cheaters.findByIdAndUpdate(req.body.id, cheater, {}, function (err,cheater) {
        if (err) {
            return next(err);
        }
        console.log("successs")
        res.json('success')
    });
}
/*********************************
search cheater
*********************************/
exports.searchCheater = function(req, res, next) {
    const query= req.query.name;
    Cheaters.find({'$or':[{name: new RegExp(query, 'i')}, {description: new RegExp(query, 'i')}]}, (err, cheat) => {
		if (err) {
			return console.error(err.toString());
		}
		console.log(cheat, 'cheats');
		res.json(cheat);
	})
}
/*********************************
add Bug
*********************************/
exports.addBug = function(req, res, next) {
    console.log(req.body,'bugs');
    req.checkBody('title', 'Title must not be empty').notEmpty();
    req.checkBody('name', 'Name must not be empty').notEmpty();
    req.checkBody('fullname', 'Fullname name must not be empty').notEmpty();
    req.checkBody('comment', 'Comment must not be empty').notEmpty();

    //sanitize
    req.sanitize('title').escape();
    req.sanitize('name').escape();
    req.sanitize('fullname').escape();
    req.sanitize('comment').escape();

    req.sanitize('title').trim();
    req.sanitize('name').trim();
    req.sanitize('fullname').trim();
    req.sanitize('comment').trim();
    const bugs = new Bugs(
        {
            title: req.body.title,
            name: req.body.name,
            fullname: req.body.fullname,
            comment: req.body.comment,
            date_created: moment().format('YYYY-MM-DD')
        }
    )
    let errors = req.validationErrors();
    if (errors) {
        console.log(errors, 'error occured');
    } else {
        bugs.save(function(err) {
            if (err) {
                return next(err);
            }
            console.log("o so ok")
            res.json('fuck');
        })
    }
}
/********************************
get all bugs
********************************/
exports.getBugs = function(req, res, next) {
    Bugs.find({}, '_id title name fullname comment date_created', {sort: {'_id': -1}}, function(err, bugs) {
        if (err) {
            return next(err);
        }
        res.json(bugs);
    })
}
exports.login = function(req, res, next) {
    console.log(req.body,'body')
}
