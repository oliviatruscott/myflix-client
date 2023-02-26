import { Button, Col } from "react-bootstrap";

export const DeleteUser = ({ storedToken, storeduser }) => {
    const handleDeregister = () => {
        const userWarning = confirm(
            "All imformation will be lost and cannnot be recovered. Are you sure you want to delete your account?"
        );
        userWarning === false
            ? alert("Keep choosing your favorite movies!")
            : fetch(
                `link`, //link to api site with /users/${storedToken}
                {
                    method: "DELETE",
                    headers: {
                        Authorizaqtion: `Bearer ${storedToken}`,
                        "Content-Type": "application/json",
                    },
                }
            )
        .then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                localStorage.clear();
                window.location.reload();
            } else {
                alert("Something went wrong");
            }
        })
        .catch((e) => console.log(e));
    };
    return (
        <Col md-={5} className="text-end px-4">
            <Button
                onClick={() => handleDeregister(storedUser._id)}
                className="button-delete"
                variant="danger"
            >
                Delete Account
            </Button>
        </Col>
    );
};