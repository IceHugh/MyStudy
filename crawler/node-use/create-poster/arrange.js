const fs = require('fs');
const path = require('path');
const async = require('async');
const gm = require('gm');
const _ = require('lodash');
const rimraf = require('rimraf');
let source = fs.readdirSync('./source');

exports.arrange = (width, height, cb) => {
  rimraf('./destiation/*', () => {
    let groups = _.chunk(source, width);
    let formatGroups = groups.slice(0, height);
    async.eachOfLimit(formatGroups, 2, (group, index, cbGroup) => {
      let gmstate = gm('./source/' + group[0]);
      for (let j = 1; j < group.length; j++) {
        gmstate.append('./source/' + group[j], true)
      }
      // console.log(gmstate);
      gmstate.write('./destination/' + (index + 1000) + '.jpg', (err) => {
        if (err) {
          // console.dir(arguments);
          return cb(err);
        }
        console.log(this.outname + 'created: ' + arguments[3]);
        return cbGroup();
      })
    }, (err) => {
      let integration = fs.readdirSync('./destination');
      let gmStateDms = gm('./destination/' + integration[0]);
      for (let i = 1; i < integration.length; i++) {
        gmStateDms.append('./destination/' + integration[i]);
      }
      gmStateDms.write('./destination/' + 'theLastOne.jpg', (err) => {
        if (err) {
          console.dir(arguments);
          return cb(err);
        };
        console.log(this.outname + 'created: ' + arguments[3]);
        return cb(null, 'finished');
      })
    })
  })
}
