import { createStore } from 'vuex'
import auth from '../modules/auth/store/index'
import memoryGame from '../modules/memoryGame/store/index'


const store = createStore({
    modules: {
        auth,
        memoryGame,       
    }
})

export default store
  