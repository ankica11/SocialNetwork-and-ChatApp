export class UserSession{
    id: number
    refreshToken: string
    created_at: Date
    updated_at: Date
    expires_at: Date
    user_agent: string
    status: string
    online: boolean
    lastAccessedAt: Date
    

}