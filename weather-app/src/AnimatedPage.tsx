import { motion, Variants } from 'framer-motion';

// Define the variants
const animations: Variants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
};

type AnimatedPageProps = {
    children: React.ReactNode; // Change this type based on the actual type of your children
};

const AnimatedPage: React.FC<AnimatedPageProps> = ({ children }) => {
    return (
        <motion.div variants={animations} initial='initial' animate='animate' exit='exit' transition={{ duration: 2 }}>
            {children}
        </motion.div>
    );
};

export default AnimatedPage;
