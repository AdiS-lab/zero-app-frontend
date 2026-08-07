import { H1, StyledLink, HomePage } from '../ui'

export default function Home(){
    return (
        <HomePage>
            <H1>Pictionary!</H1>
            <div className="flex gap-6">
                <StyledLink to="/register">Sign Up</StyledLink>
                <StyledLink to="/login">Log In</StyledLink>
            </div>
        </HomePage>
    )
}