import getPackage from 'get-repo-package-json';

export default async function fetchRepoPackage(url){

  const packageJson = await getPackage(url);
  return packageJson
  
}