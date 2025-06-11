import { useEffect } from "react";


function ChatBot() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            // Nếu có thể xóa <df-messenger> lúc unmount
            const messenger = document.querySelector('df-messenger');
            if (messenger) messenger.remove();
        }
    }, []);

    return (
        <df-messenger
            intent="WELCOME"
            chat-title="PetShop"
            agent-id="4011de71-670a-49cb-8226-0a9179968bd6"
            language-code="vi"
        />
    );
}

export default ChatBot