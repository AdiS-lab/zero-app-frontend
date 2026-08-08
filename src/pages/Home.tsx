import { H1, StyledLink, Background } from '../ui'
import { Notifications } from '../components/Notifications'

export default function Home(){
    return (
        <Background>
            <div className="flex flex-col items-center justify-center min-h-screen gap-12">
                <H1>Welcome to Pictionary!</H1>
                <div className="flex gap-6">
                    <StyledLink to="/register">Sign Up</StyledLink>
                    <StyledLink to="/login">Log In</StyledLink>
                </div>
                <Notifications />
            </div>
        </Background>
    )
}