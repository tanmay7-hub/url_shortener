import crypto from 'crypto';
function shortCodegenerator(){
        return crypto.randomBytes(4).toString('hex');
}
export default shortCodegenerator;