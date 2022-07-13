import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  namespaced: true,
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {},
  }),
  getters: {},
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage // search 페이지에 초기 메세지 재설정
      state.loading = false // 페이지 전환시 로딩 애니메이션 중지 시키기 위해
    },
    // updateMovies(state, payload) {
    //   state.movies = state.movies.concat(payload)
    // }
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      try {
        if (state.loading) return // api 요청 중복 실행 방지
        commit('updateState', {
          loading: true, 
          message: '' // 검색하기 전 기존 에러 메세지 삭제
        })
        // commit('resetMovies')
        const res = await _fetchMovie({
          ...payload,
          page: 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) // 결과수로 페이지 길이 계산하기
  
        // 추가 요청
        if (pageLength > 1) { // 페이지 길이가 2이상이면 추가 요청
          for (let page = 2; page <= pageLength; page++) { // 페이지 길이만큼 모조리 반복
            if (page > (payload.number / 10)) break // 설정해놓은 노출 갯수를 넘어가버리면 반복문 정지
            const res = await _fetchMovie({ // API 요청
              ...payload,
              page
            })
            const { Search } = res.data
  
            // commit('updateMovies', Search)
            commit('updateState', { // 최초 요청한 데이터를 유지한채 추가요청 데이터를 배열에 포함시키기 (전개연산자 사용하는 방법을 못 쓴다면 concat을 사용하는 방법(updateMoives)으로 해결)
              movies: [
                ...state.movies,
                ..._uniqBy(Search, 'imdbID')
              ]
            })
          }
        }
      } catch ({ message }) {
        commit('updateState', {
          movies: [], // 기존 결과물들을 초기화
          message // 스토어의 message에 전역으로 오류 메세지를 저장, (넷리파이 서버리스 함수로 변경하여 에러 발생시, 에러 객체가 내려오는 것을 주의!)
        })
      } finally {
        commit('updateState', { loading: false })
      }
    },
    async searchMovieWithId( { state, commit }, payload) {
      if (state.loading) return

      commit('updateState', {
        theMovie: {},
        loading: true
      })
      
      try {
        const res = await _fetchMovie(payload)
        // console.log(res);
        commit('updateState', {
          theMovie: res.data
        })
      } catch (err) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  }
}

async function _fetchMovie(payload) {
  return await axios.post('/.netlify/functions/movie', payload)
}