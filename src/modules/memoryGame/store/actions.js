import animalsApi from '../../../api/animals'

export const loadAnimals = async ({ commit }) => {

    return new Promise((resolve, reject) => {
        commit('setLoading', true)
        animalsApi.get('/content/spaces/animals/types/game/entries?per_page=20')
            .then(res => {

                commit('setAnimals', res.data.entries)
                commit('setHasError', false)
                commit('setLoading', false)
                resolve(res.data.entries);

            })
            .catch(err => {
                commit('setHasError', true)
                commit('setLoading', false)
                reject(err)
            }
            );
    })
}

