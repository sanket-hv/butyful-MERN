 function getAPIURL(){
    const url = "http://localhost:8000/"
    // const url = "http://ec2-3-6-40-111.ap-south-1.compute.amazonaws.com:8080/"
    return url;
}

export const LoginAPI = () => {
    const url = getAPIURL()
    const LoginURL = `${url}auth/login`;
    return LoginURL;
}

export const ItemGetAPI = () => {
    const url = getAPIURL();
    const ItemGetURL = `${url}itemmaster`;
    return ItemGetURL;
}

export const CategoryGetAPI = () => {
    const url = getAPIURL();
    const CategoryURL = `${url}category`;
    return CategoryURL;
}
export const PostItemAPI = () => {
    const url = getAPIURL();
    const POSTItemTURL = `${url}itemmaster`;
    return POSTItemTURL;
}

export const GetSingleItem = (id) => {
    const url = getAPIURL();
    const GETITEM = `${url}itemmaster/` + id ;
    return GETITEM;
}

export const PUTItem = () => {
    const url = getAPIURL();
    const PUTITEMURL = `${url}itemmaster/updateitems`;
    return PUTITEMURL;
}

export const GetProduction = () => {
    const url = getAPIURL();
    const GETProduction = `${url}production`;
    return GETProduction;
}

export const POSTProduction = () => {
    const url = getAPIURL();
    const postProduction = `${url}production`;
    return postProduction;
}

export const GetTables = () => {
    const url = getAPIURL();
    const tables = `${url}tableno`;
    return tables;
}

export const VerifyAPI = () => {
    const url = getAPIURL();
    const verify = `${url}auth/playload`;
    return verify;
}

export const GETChart1 = () => {
    const url = getAPIURL();
    const v1 = `${url}dashboard/tablewiseproduction`;
    return v1;
}

export const GETChart2 = () => {
    const url = getAPIURL();
    const v1 = `${url}dashboard/productiontrend`;
    return v1;
}

export const ProductionTrendByTable = (id) => {
    const url = getAPIURL();
    const v1 = `${url}dashboard/productiontrendbytable/` + id;
    return v1;
}

export const POSTTable = () => {
    const url = getAPIURL();
    const V3 = `${url}tableno`;
    return V3;
}

export const GETUser = () => {
    const url = getAPIURL();
    const V3 = `${url}common/getuser`;
    return V3;
}
export const POSTUser = () => {
    const url = getAPIURL();
    const V3 = `${url}common/signup`;
    return V3;
}

export const GETSingleUser = (id) => {
    const url = getAPIURL();
    const V3 = `${url}common/getuser/` + id;
    return V3;
}

export const PUTUser = () => {
    const url = getAPIURL();
    const V3 = `${url}common/updateuser`;
    return V3;
}

export const DeleteUser = (id) => {
    const url = getAPIURL();
    const V3 = `${url}common/deleteuser/`  + id;
    return V3;
}

export const FGStockReport = () => {
    const url = getAPIURL();
    const V3 = `${url}dashboard/fgstockreport`;
    return V3;
}

export const RawMaterialPackingReport = () => {
    const url = getAPIURL();
    const V3 = `${url}dashboard/searchbyitemandcategory`;
    return V3;
}

export const GETMasterbox = () => {
    const url = getAPIURL();
    const V3 = `${url}dashboard/todaytotalmasterbox`;
    return V3;
}

export const GETDASHBOARDTIME = () => {
    const url = getAPIURL();
    const V3 = `${url}dashboard/lastproductiontime`;
    return V3;
}