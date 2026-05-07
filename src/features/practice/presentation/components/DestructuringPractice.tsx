import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './DestructuringPractice.style';

// ─── Sample Data ────────────────────────────────────────────────────────────

const user = { name: 'Ali', age: 25, city: 'Karachi' };
const colors = ['red', 'green', 'blue', 'yellow'];
const product = { title: 'Phone', price: 500, specs: { ram: '8GB', storage: '128GB' } };
const settings: { theme: string; language: string; notifications: boolean; fontSize?: number } = {
    theme: 'dark', language: 'en', notifications: true,
};

// ─── 1. Object Destructuring ────────────────────────────────────────────────
const { name, age, city } = user;

// ─── 2. Array Destructuring ─────────────────────────────────────────────────
const [firstColor, secondColor] = colors;

// ─── 3. Default Values ──────────────────────────────────────────────────────
const { theme, language, notifications, fontSize = 16 } = settings;

// ─── 4. Renaming Variables ──────────────────────────────────────────────────
const { name: userName, city: userCity } = user;

// ─── 5. Nested Destructuring ────────────────────────────────────────────────
const { title, specs: { ram, storage } } = product;

// ─── 6. Rest Operator ───────────────────────────────────────────────────────
const [head, ...tail] = colors;
const { name: _name, ...restUser } = user;

// ─── 7. Function Parameter Destructuring ────────────────────────────────────
const greet = ({ name: n, age: a }: { name: string; age: number }) =>
    `Hello ${n}, you are ${a} years old`;

const greetResult = greet(user);

// ─── 8. Swap Variables ──────────────────────────────────────────────────────
let x = 10;
let y = 20;
[x, y] = [y, x];

// ─── Component ──────────────────────────────────────────────────────────────

const DestructuringPractice: React.FC = () => {
    return (
        <View style={styles.container}>

            {/* 1. Object Destructuring */}
            <Text style={styles.sectionLabel}>1. Object Destructuring</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const { name, age, city } = user;`}</Text>
            </View>
            <Text style={styles.outputText}>
                name: <Text style={styles.highlight}>{name}</Text>{'  '}
                age: <Text style={styles.highlight}>{age}</Text>{'  '}
                city: <Text style={styles.highlight}>{city}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 2. Array Destructuring */}
            <Text style={styles.sectionLabel}>2. Array Destructuring</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const [firstColor, secondColor] = colors;`}</Text>
            </View>
            <Text style={styles.outputText}>
                first: <Text style={styles.highlight}>{firstColor}</Text>{'  '}
                second: <Text style={styles.highlight}>{secondColor}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 3. Default Values */}
            <Text style={styles.sectionLabel}>3. Default Values</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const { theme, fontSize = 16 } = settings;`}</Text>
            </View>
            <Text style={styles.outputText}>
                theme: <Text style={styles.highlight}>{theme}</Text>{'  '}
                fontSize (default): <Text style={styles.highlight}>{fontSize}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 4. Renaming Variables */}
            <Text style={styles.sectionLabel}>4. Renaming Variables</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const { name: userName, city: userCity } = user;`}</Text>
            </View>
            <Text style={styles.outputText}>
                userName: <Text style={styles.highlight}>{userName}</Text>{'  '}
                userCity: <Text style={styles.highlight}>{userCity}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 5. Nested Destructuring */}
            <Text style={styles.sectionLabel}>5. Nested Destructuring</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const { title, specs: { ram, storage } } = product;`}</Text>
            </View>
            <Text style={styles.outputText}>
                title: <Text style={styles.highlight}>{title}</Text>{'  '}
                ram: <Text style={styles.highlight}>{ram}</Text>{'  '}
                storage: <Text style={styles.highlight}>{storage}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 6. Rest Operator */}
            <Text style={styles.sectionLabel}>6. Rest Operator</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const [head, ...tail] = colors;\nconst { name: _name, ...restUser } = user;`}</Text>
            </View>
            <Text style={styles.outputText}>
                head: <Text style={styles.highlight}>{head}</Text>{'  '}
                tail: <Text style={styles.highlight}>{tail.join(', ')}</Text>
            </Text>
            <Text style={styles.outputText}>
                restUser: <Text style={styles.highlight}>{JSON.stringify(restUser)}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 7. Function Parameter Destructuring */}
            <Text style={styles.sectionLabel}>7. Function Param Destructuring</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`const greet = ({ name, age }) =>\n  \`Hello \${name}, you are \${age} years old\``}</Text>
            </View>
            <Text style={styles.outputText}>
                Output: <Text style={styles.highlight}>{greetResult}</Text>
            </Text>

            <View style={styles.divider} />

            {/* 8. Swap Variables */}
            <Text style={styles.sectionLabel}>8. Swap Variables</Text>
            <View style={styles.codeBlock}>
                <Text style={styles.codeText}>{`let x = 10, y = 20;\n[x, y] = [y, x];`}</Text>
            </View>
            <Text style={styles.outputText}>
                x: <Text style={styles.highlight}>{x}</Text>{'  '}
                y: <Text style={styles.highlight}>{y}</Text>
            </Text>

        </View>
    );
};

export default DestructuringPractice;
