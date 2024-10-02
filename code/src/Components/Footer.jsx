import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            Made by © Rahul Kumar Saw {" "} 
            <a href="https://github.com/r6654kumar">
                <GitHubIcon/> 
            </a> {" "} 
            <a href="https://www.linkedin.com/in/rahul-kumar-saw-1b5aa024a/">
                <LinkedInIcon/> 
            </a>
        </span>
    </div>
</footer>
)
}
export default Footer