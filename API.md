Models:
User - id, realName, userId, userName, password, email, userType, score, solvedSafes
Class - id, classInfo{className, classNumber}, instructorId, studentIds, district
Safe - id, ownerId, safeName, isVerified, relPath
Tournament - id, classRelated, showScore, deadline, safes{safeId, displayName}

# - Must have token in header (Bearer token). [verifyToken middleware, here we create the: req.user = User]

/users
register: POST / ({ realName, email, password, userId })=> {id, userName, email, safesSolved, userType, token}
login: POST /login ({userName, password})=> {id, userName, email, safesSolved, userType, token}
#getUserData: GET /user ()=> {id, realName, email, score, solvedSafes}
#getUsersSafeData: GET /safe ()=> {safes:[Safe]}

/classes
#getClassesData: GET / () => {classesIn:[Class]}
#getAdminSafesData: GET /safes () => {safes:[Safe]}
#getStudentsInClass: GET /students ({classId}) => {students:[{id, userId, hasSubmitedSafe, isSafeVerified, score, realName}]}
#addStudentToClass: POST /students ({classId, studentUserName}) => {Class}

/safes
#uploadSafe: POST / ({classesToAdd:[classId]} + FILE) => {newSafes:[Safe]}
#downloadSafe: GET / ({safeId} => BIN_FILE
#breakSafe: POST /break ({safeId} + FILE) => {isSucceeded}
#deleteSafe: DELETE / ({safeId}) => {safes:[Safe]}

/tournaments
#getTournamentsData: GET / () => {tournaments:[Tournament]}
#createTournament: POST / ({classId, showScore, deadline}) => {newTournament}
#getTournamentSafes: GET /safes ({tournamentId}) => {safes:[Safe]}
#updateTournament: PUT / ({classId, showScore, deadline}) => {updated}
#getScoreBoard: GET /scores ({tournamentId}) => {scores:[{realName,score}]}

/admin
#addSafeToDB: POST /safes ({safeName}) => {Safe}
#addClassToDB: POST /class ({className, classNumber, instructorUserName, district}) => {Class}
