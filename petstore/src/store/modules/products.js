const state = {
    products: {},
    session: false,
};
const mutations = {
    'SET_STORE' (state, products){
        state.products = products;
    },
    'SET_SESSION' (state, session){
        state.session = session;
    }
};
const actions = {
    initStore: ({commit}) => {
        axios.get('static/products.json')
        .then((response)=>{
            commit('SET_STORE', response.data.products);
        });
    },
};
const getters ={
    products: state => state.products,
    session: state => state.session,
};

export default { state, mutations, actions, getters };