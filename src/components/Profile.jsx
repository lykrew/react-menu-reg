import { useState, useEffect } from "react";

export default function Profile() {
    const [name, setName] = useState("");
    const [newName, setNewName] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const savedName = localStorage.getItem("name");
        const savedPosts = JSON.parse(localStorage.getItem("posts"));

        if (savedName) setName(savedName);
        else setName("Иван");

        if (savedPosts) setPosts(savedPosts);
        else setPosts(["Пост 1", "Пост 2"]);
    }, []);

    useEffect(() => {
        localStorage.setItem("name", name);
        localStorage.setItem("posts", JSON.stringify(posts));
    }, [name, posts]);

    const handleChangeName = () => {
        if (!newName.trim()) return;
        setName(newName);
        setNewName("");
    };

    return (
        <div>
            <h2>{name}</h2>

            <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleChangeName}>
                Сменить имя
            </button>

            <ul>
                {posts.map((post, i) => (
                    <li key={i}>{post}</li>
                ))}
            </ul>
        </div>
    );
}