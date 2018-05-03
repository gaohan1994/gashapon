import 
    main, {  
        getBanners,
        getGashaponBanner,
        getGashapons,
        getGenres,
        getLastGenre,
        getLoading,
        getTopics,
        getData,
    } from '../main';
import { 
    RECEIVE_BANNERS_BY_GENRE,
    RECEIVE_BANNERS_BY_TOPIC,
    RECEIVE_GENRES,
    RECEIVE_MAIN_BANNERS,
    RECEIVE_MAIN_GAHSAPONS,
    RECEIVE_TOPICS,
    LOADING_GASHAPONS
} from '../../constants/main';
import initState from '../main/state';
import store from '../initState';

describe('main test begin', () => {

    const gashapons = [{
        _id: '123',
        name: 'ghan',
        desc: 'test',
        start_time: new Date(),
        end_time: new Date(),
        open_time: new Date(),
        price: 100,
        pics: ['123'],
        product_list: [{
            _id: '123',
            name: 'gg',
            pics: ['23'],
            quantity: 0,
            rate: 0.1,
            status: 0,
        }],
        residue_quantity: 1,
        status: 0,
        music_url: 'test',
        is_discount: true,
        collect_count: 20,
        discount_plan: {
            max_discount: 1,
            create_date : new Date(),
            update_date : new Date(),
        }
    }];

    const banners = [{
        _id: '123',
        pic: '123',
        param: '123',
        desc: '123',
        type: 1
    }];

    it('should reecive gashapons', () => {
        expect(main(initState, {type: RECEIVE_MAIN_GAHSAPONS, gashapons: gashapons}))
        .toEqual({
            ...initState,
            gashapons: gashapons
        });
    });

    it('should reecive loading true', () => {
        const loading = true;
        expect(main(initState, {type: LOADING_GASHAPONS, loading: loading}))
        .toEqual({
            ...initState,
            loading: loading
        });
    });

    it('should reecive loading false', () => {
        const loading = false;
        expect(main(initState, {type: LOADING_GASHAPONS, loading: loading}))
        .toEqual({
            ...initState,
            loading: loading
        });
    });

    it('should receive main banners', () => {
        
        expect(main(initState, {type: RECEIVE_MAIN_BANNERS, banners: banners}))
        .toEqual({
            ...initState,
            banners: banners
        });
    });

    it('should reecive genres', () => {
        const genres = [{}];
        expect(main(initState, {type: RECEIVE_GENRES, genres: genres}))
        .toEqual({
            ...initState,
            genres: genres
        });
    });

    it('should reecive topic', () => {
        const topics = [{}];
        expect(main(initState, {type: RECEIVE_TOPICS, topics: topics}))
        .toEqual({
            ...initState,
            topics: topics
        });
    });

    it('should receive genre banners', () => {
        expect(main(initState, {type: RECEIVE_BANNERS_BY_GENRE, gashaponBanner: banners}))
        .toEqual({
            ...initState,
            gashaponBanner: banners
        });
    });

    it('should receive topic banners', () => {
        expect(main(initState, {type: RECEIVE_BANNERS_BY_TOPIC, gashaponBanner: banners}))
        .toEqual({
            ...initState,
            gashaponBanner: banners
        });
    });

    describe('get method tests', () => {
        const Store = {
            ...store,
            main: {
                gashapons: gashapons,
                lastGenre: '123',
                lastTopic: '123',
                lastWord : 'lastWord',
                loading: true,
                banners: banners,
                genres: [{}],
                topics: [{}],
                gashaponBanner: banners,
                searchWords: [{}],
                data: {test: '123'},
            }
        };

        it('should get gashapons', () => {
            expect(getGashapons(Store)).toEqual(gashapons);
        });

        it('should get lastGenre', () => {
            expect(getLastGenre(Store)).toEqual('123');
        });

        it('should get loading', () => {
            expect(getLoading(Store)).toEqual(true);
        });

        it('should get banners', () => {
            expect(getBanners(Store)).toEqual(banners);
        });

        it('should get genres', () => {
            expect(getGenres(Store)).toEqual([{}]);
        });

        it('should get topics', () => {
            expect(getTopics(Store)).toEqual([{}]);
        });

        it('should get gashapon banners', () => {
            expect(getGashaponBanner(Store)).toEqual(banners);
        });

        it('should get data', () => {
            expect(getData(Store)).toEqual({test: '123'});
        });
    });
});