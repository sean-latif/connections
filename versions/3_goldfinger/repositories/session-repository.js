class SessionRepository {
    static sessions = {};

    static startSession() {
        const sessionId = Math.floor(Math.random() * 100);
        this.sessions[sessionId] = {
            sessionId: sessionId,
            submissions: []
        };
        return sessionId;
    }

    static addSubmission(sessionId, submission) {
        this.sessions[sessionId].submissions.push(submission);
    }

    static getSubmissions(sessionId) {
        return this.sessions[sessionId].submissions;
    }
}