export default function auth({next, router}) {
    
    if (!localStorage.getItem('token')) {

        return next('/login')

    }

    return next();
}