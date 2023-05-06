export default function adminGuard({next}) {

    const getUserInStorage = localStorage.getItem('user');

    if(!getUserInStorage) {
        return next('/login');
    }
    const user = JSON.parse(getUserInStorage);
    const role = user.roles[0].name;
    
    switch(role) {
        case 'client' : return next(`/client/${user.name}`)
        break;
        case 'employee' : return next(`/client/${user.name}`)
        break;
        default : return next();
    }   
}