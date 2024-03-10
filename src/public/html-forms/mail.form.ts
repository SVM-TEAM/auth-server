export const signUpUserMailForm = (
  siteName: string,
  verifyCode: string,
): string => `
<!DOCTYPE html>
<html>
<head>
    <title>회원가입 인증</title>
</head>
<body>
    <h1>안녕하세요!</h1>
    <br/>
    <br/>
    <p>
        ${siteName} 서비스를 이용하시려면, 이메일에 대한 인증이 필요합니다.
    </p>
    <br/>
    <p>
        절차를 진행하려면 아래 링크를 클릭해 주세요:<br>
        <a href="http://localhost:3000/email-authentication/${verifyCode}">회원 인증하기</a>
    </p>
    <br/>
    <p>
        질문이 있으시면 언제든지 이메일로 문의해 주세요. 도와드리겠습니다.
    </p>
    <br/>
    <p>
        감사합니다,<br>
        ${siteName}
    </p>
    <br/>
    <footer>
        <p>
            문의 이메일<br/>
            <a href="mailto:motojate@naver.com">motojate@naver.com</a>
        </p>
    </footer>
</body>
</html>`;
