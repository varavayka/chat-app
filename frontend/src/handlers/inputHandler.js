
const inputDataHadler = (setState, state, valueKey) => {

    return ({target}) => setState({...state,[valueKey]: target.value })

}
export default inputDataHadler