import { motion } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  delay?: number
}

export default function AnimatedSection({ children, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-50px" }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}
