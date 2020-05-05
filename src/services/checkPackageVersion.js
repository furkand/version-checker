import isOutDated from 'is-outdated'

export default function checkPackageVersion(){
  isOutdated(pkg.name, pkg.version, function (err, res) {
    console.log('The latest version of this app is %s', res.version);
    console.log('Please updated it with: npm update -g mypackage');
  });
}
