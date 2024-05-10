import { useState, useEffect } from "react";

const useLessons = () => {
  const lessonsUrl = "http://localhost:4000/lessons";
  const tokenUrl = "http://localhost:4000/token";
  const [lessons, setLessons] = useState([]);
  const [role, setRole] = useState(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token ? token.role : "visitor";
  });
  const SEC_TO_MS = 1000;
  const [token, setToken] = useState(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    return token ? token.token : null;
  });
  const [isTokenExpired, setIsTokenExpired] = useState(false);

  const fetchToken = (role) => {
    fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: role,
        password: role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem(
          "token",
          JSON.stringify({
            token: data.token,
            createdAt: data.createdAt,
            duration: data.duration,
            role: role,
          })
        );
        setToken(data.token);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Check token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const tokenData = JSON.parse(localStorage.getItem("token"));

      // Check if token is expired
      if (tokenData) {
        const { createdAt, duration } = tokenData;
        const currentTime = Date.now();
        const tokenDuration = duration * SEC_TO_MS;
        const isExpired = currentTime - createdAt > tokenDuration;
        console.log(`(${role.toUpperCase()}): Time remaining before expiring = ${Math.trunc((tokenDuration - (currentTime - createdAt)) / SEC_TO_MS)}s`);
        setIsTokenExpired(isExpired);
      }
    };

    // Run the check immediately
    checkTokenExpiration();

    // Then run it every second (or any other interval you prefer)
    const intervalId = setInterval(checkTokenExpiration, 1000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [role]);

  // Get JWT token
  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token"));

    // If token is expired and role is 'admin' or 'writer', reset role to 'visitor'
    if (isTokenExpired && (role === "admin" || role === "writer")) {
      alert("Your token has expired. Switching to visitor role.")
      setRole("visitor");
    }

    // Fetch token if it's not available, or if role has changed, or if visitor token has expired
    if (
      !token ||
      (tokenData && tokenData.role !== role) ||
      (role === "visitor" && isTokenExpired)
    ) {
      fetchToken(role);
    }
  }, [token, role, isTokenExpired]);

  // GET lessons
  useEffect(() => {
    // Fetch lessons only if token is available
    if (token) {
      fetch(lessonsUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => setLessons(data))
        .catch((error) => console.error("Error:", error));
    }
  }, [token]);

  // ADD lesson
  const addLesson = (newLesson) => {
    if (token) {
      fetch(lessonsUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newLesson),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          setLessons([...lessons, newLesson]);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // UPDATE entire lesson
  const updateLesson = (updatedLesson) => {
    if (token) {
      fetch(`${lessonsUrl}/${updatedLesson.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLesson),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          const updatedLessons = lessons.map((lesson) =>
            lesson.id === updatedLesson.id ? updatedLesson : lesson
          );
          setLessons(updatedLessons);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // PATCH lesson
  const patchLesson = (id, score) => {
    if (token) {
      fetch(`${lessonsUrl}/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: score }),
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          const updatedLessons = lessons.map((lesson) =>
            lesson.id === id ? { ...lesson, score: score } : lesson
          );
          setLessons(updatedLessons);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // DELETE lesson
  const deleteLesson = (id) => {
    if (token) {
      fetch(`${lessonsUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw response;
          }
          // If delete was successful, update state
          setLessons(lessons.filter((lesson) => lesson.id !== id));
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  return {
    fetchToken,
    role,
    setRole,
    lessons,
    addLesson,
    updateLesson,
    patchLesson,
    deleteLesson,
  };
};

export { useLessons };
export default useLessons;
