const baseUrl = 'http://localhost:3070'

export const state = () => ({
    main: '',
    mainImage: [],
    main2: '',
    main3: '',
    main4: '',
    main5: '',

})

export const mutations = {
    //main
    ADD_MAIN_FORM_IMAGE(state, payload){
        state.mainImage = state.mainImage.concat(payload)  // concat [1], [2] => [1, 2]
    },
    REMOVE_MAIN_FORM_IMAGE(state, payload){
        state.mainImage.splice(payload, 1)  // [1, 2, 3] -< [1, 2] -> [3]
    },





    REMOVE_MAIN(state){
        state.main = ''
    },
    ADD_MAIN2(state, payload){
        state.main2 = payload
    },
    REMOVE_MAIN2(state){
        state.main2 = ''
    },

    ADD_MAIN3(state, payload){
        state.main3 = payload
    },
    REMOVE_MAIN3(state){
        state.main3 = ''
    },
    ADD_MAIN4(state, payload){
        state.main4 = payload
    },
    REMOVE_MAIN4(state){
        state.main4 = ''
    },
    ADD_MAIN5(state, payload){
        state.main5 = payload
    },
    REMOVE_MAIN5(state){
        state.main5 = ''
    },


    //card
    ADD_CARD(state, payload){
        console.log('mutations_card', payload)
        state.card = payload
    },
    ADD_CARD2(state, payload){
        console.log('mutations_card', payload)
        state.card2 = payload
    },
    ADD_CARD3(state, payload){
        console.log('mutations_card', payload)
        state.card3 = payload
    },

    REMOVE_CARD(state){
        state.card=''
    },
    REMOVE_CARD2(state){
        state.card2=''
    },
    REMOVE_CARD3(state){
        state.card3=''
    }
}


export const actions= {
    //main
    addMainFormImage({commit}, payload){
        this.$axios.post(`${baseUrl}/image/mainFormImage`, payload, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            commit('ADD_MAIN_FORM_IMAGE', res.data)
        }).catch((err)=>{
            console.error(err)
        })
    },


    removeMain({commit}, payload){
        commit('REMOVE_MAIN', payload)
    },


    addMain2({commit}, payload){
        commit('ADD_MAIN2', payload)
    },
    removeMain2({commit}, payload){
        commit('REMOVE_MAIN2', payload)
    },

    addMain3({commit}, payload){
        commit('ADD_MAIN3', payload)
    },
    removeMain3({commit}, payload){
        commit('REMOVE_MAIN3', payload)
    },

    addMain4({commit}, payload){
        commit('ADD_MAIN4', payload)
    },
    removeMain4({commit}, payload){
        commit('REMOVE_MAIN4', payload)
    },

    addMain5({commit}, payload){
        commit('ADD_MAIN5', payload)
    },
    removeMain5({commit}, payload){
        commit('REMOVE_MAIN5', payload)
    },







    //card
    addCard({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD', payload)
    },
    addCard2({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD2', payload)
    },
    addCard3({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD3', payload)
    },

    removeCard({commit}, payload){
        commit('REMOVE_CARD', payload)
    },
    removeCard2({commit}, payload){
        commit('REMOVE_CARD2', payload)
    },
    removeCard3({commit}, payload){
        commit('REMOVE_CARD3', payload)
    },



}