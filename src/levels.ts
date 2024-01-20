import { Persona, type LevelType } from "./lib/types";

export const levels: LevelType[] = [
  {
    levelNo: "1",
    persona: Persona.MANAGER,
    name: "John",
    position: "Manager",
    imageUrl: "https://avatars.githubusercontent.com/u/1?v=4",
    challenge:
      "Morning intern. We've got a challenge for you, are you up for it? Your first task is to refactor Twitter to X. Not easy, but I'm sure you can handle it. Get it done before lunchtime",
    contextPrompt:
      "It's the intern's first day for you. You are giving a code review for the new intern, but your goal is to be as unhelpful as possible. Give intentionally vague comments",
    initialCode: `export default function Twitter() {
  return (
    <div>Twitter</div>
  )
}`,
    sampleAnswer: `export default function X() {
  return (
    <div>X</div>
  )
}`,
    sampleCorrectResponse: `Well what do you know, you actually did something right.`,
    sampleWrongResponse: "Intern, You're not supposed to get this wrong.",
    similarity: 1,
  },
  {
    levelNo: "2",
    persona: Persona.COLLEAGUE,
    name: "David",
    position: "Senior SWE",
    imageUrl: "https://avatars.githubusercontent.com/u/1?v=5",
    challenge:
      "Hey, you're the new intern right? We've got a big problem, I accidentally pushed some code for notification preferences that ended up no working. Since you're free, could you help me out? I haven't eaten at ALL. Thanks so much!",
    contextPrompt:
      "You made a tiny oopsie at work and you want to push the job of fixing it to the intern. When reviewing the intern's code, you don't want to really help and you'll just be giving extremely vague comments because you want to save as much time as possible. ",
    initialCode: `import React, { Component } from 'react';

class ToggleButtonClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
    };
  }

  handleToggle = () => {
    this.setState((prevState) => ({
      isOn: !prevState.isOn,
    }));
  };

  render() {
    return (
      <button onClick={this.handleToggle}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

export default ToggleButtonClass;
  `,
    sampleAnswer: `import React, { Component, useState } from 'react';

const ToggleButton = () => {
  const [isOn, setIsOn] = useState(false);

  handleToggle = () => {
    setIsOn(!isOn)
  };

  return (
    <button onClick={handleToggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}

export default ToggleButton;`,
    sampleCorrectResponse:
      "Hey, thanks man. You really saved me this time. Hey, come to think of it, I have another job for you",
    similarity: 0.5,
    sampleWrongResponse:
      "What the heck is this shit? You need to pick up the slack intern, you can't be outputting such shoddy work like this.",
  },

  {
    levelNo: "3",
    persona: Persona.ELON,
    name: "Elon",
    position: "Software Architect",
    imageUrl: "https://avatars.githubusercontent.com/u/3?v=5",
    challenge:
      "Hey, I've been reviewing your recent commits, and I noticed some potential performance bottlenecks in our application. Specifically, the component rendering seems a bit slow. Your task is to optimize the rendering of the 'UserProfile' component. Take a look at the code, identify the issues, and implement optimizations. Remember, we need to maintain a smooth user experience. Feel free to use any optimization techniques you're familiar with.",
    contextPrompt:
      "You're a seasoned code guru known for your expertise in performance optimization. Your goal is to guide the intern in identifying and addressing performance issues in a specific component. Encourage best practices and share insights on optimizing React components.",
    initialCode: `import React, { useState, useEffect } from 'react';
  
  const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      // Fetch user data from the server based on userId
      const fetchData = async () => {
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      };
  
      fetchData();
    }, [userId]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        {/* Additional user information */}
      </div>
    );
  };
  
  export default UserProfile;
  `,
    sampleAnswer: `import React, { useState, useEffect } from 'react';
  
  const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(\`/api/users/\${userId}\`);
          const userData = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
  
      fetchData();
    }, [userId]);
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{user.name}</h1>
        <p>Email: {user.email}</p>
        {/* Additional user information */}
      </div>
    );
  };
  
  export default React.memo(UserProfile);
  `,
    sampleCorrectResponse:
      "Excellent work! Your optimizations, including proper error handling and the use of React.memo, will significantly improve the performance of the 'UserProfile' component. This demonstrates a solid understanding of performance best practices.",
    similarity: 0.9,
    sampleWrongResponse:
      "Your attempt to optimize the component is a good start, but there are still opportunities for improvement. Consider exploring additional techniques like lazy loading or optimizing the rendering of specific parts of the component. Keep refining your optimization skills!",
  },
];
