import newUser from './new-user';
import saveFavorite from './save-favorite';

export default async function signup(
    username: string,
    password: string,
    favoriteBookId: string
) {
    await newUser(username, password);
    await saveFavorite(username, favoriteBookId);
}
