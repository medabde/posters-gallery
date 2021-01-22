const postsReducer = (posts = [],action)=>{
    switch (action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'CREATE_POST':
            return [...posts, action.payload];
        case 'UPDATE_POST':
            return posts.map((post)=> post._id === action.payload._id ? action.payload : post);
        default:
            return posts;
    }

}

export default postsReducer;