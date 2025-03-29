class SessionService {
    static startSession() {
        return SessionRepository.startSession();
    }

    static addSubmission(sessionId, submission) {
        SessionRepository.addSubmission(sessionId, submission);
    }

    static getSubmissions(sessionId) {
        return SessionRepository.getSubmissions(sessionId);
    }
}