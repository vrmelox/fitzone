import LoginPage from "@/components/forms/LoginForm";


export default function Login () {
    return (
        <div
        className="bg-cover bg-center"
        style={{ backgroundImage: 'url("/homefit.jpg")' }}
        >
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10">
                     <LoginPage/>
                </div>
            </div>
    )
}