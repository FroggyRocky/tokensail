const nftFoldersModel = require('../model/nftModel');



exports.createNftFolder = async (req, context) => {
    const {user} = await context
    const {createNftFolderInput} = req;
    const {name, user_id, tokens} = createNftFolderInput;
    if(!user){
        throw new GraphQLError(errorNames.UNATHORIZED);
    } else if(!name || !user_id) {
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
    return nftFoldersModel.createNftFolder(name, user_id, tokens);
}

exports.addTokenToFolder = async (req, context) => {
    const {user} = await context
    const {folder_id, token_id} = req;
    if(!user){
        throw new GraphQLError(errorNames.UNATHORIZED);
    } else if(!folder_id || !token_id) {
        throw new GraphQLError(errorNames.INVALID_DATA);
    }
    return nftFoldersModel.addTokenToFolder(folder_id, token_id);
}

exports.getUserFolders = async (req, context) => {
    const {user} = await context
    if(!user){
        throw new GraphQLError(errorNames.UNATHORIZED);
    }
    return nftFoldersModel.getAllUserFolders(user.id);
}