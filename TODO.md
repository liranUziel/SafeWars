#SafeWars



#####TODO:
* [x] Add class model.
* [x] Connect class to users.
* [x] Add file upload.
* [x] Front-end (login,signup).
* [x] Front-end nav bar (class,leader-board,
my-safe,SafeWars).
* [x] aplly desing for nav-bar
* [x] Front-end display only public safes in class and private safe in my-safe.
* [x] Back-end SafeWars model.


SafeWars algo:
SafeWar sub route ('\safes\public')
route('\safes')
1. Get user class object
    1. Get user id
    <code>req.user.id</code>
    2. Get get class by user id 
    <code>(findOnce(req.user.id))</code>
2. Get list of user in class 
3. Get all bin safe of user in list 
4. Return list of bin safe
