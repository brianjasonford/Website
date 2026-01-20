---
title: Made a Github Repository
blurb: Created a repository as a way to back up the website's files and undo big mistakes.
---
## Made a Github Repository
These steps create a repository on Github. For now, I am just using that as an extra backup for the website files. There is a lot more that you can do with Github, but I'm not quite there yet. The first step is to make a file that tells Github what to ignore. I did not want to save all the stuff that Node and Eleventy generate automatically (there is a lot of that).

1. In the top-level `/Website` folder (the same folder were `.eleventy.js` lives), made `.gitignore`.
2. Added a version of the code from the Learn Eleventy .gitignore [example](https://learn-eleventy.pages.dev/lesson/1/#dotfiles). They call their output folder `/dist` and I call mine `/public`, so my code looks like this:
```
# Misc
*.log
npm-debug.*
*.scssc
*.swp
.DS_Store
.sass-cache
.env
.cache
 
# Node modules and output
node_modules
public
```
3. Made a [Github](https://github.com) account.
4. Connected [VS Code](https://code.visualstudio.com) to the Github account.
5. In the Source Control section of VS Code, clicked "Initialize Repository." It looks like this:
IMAGE
6. This brings up a spot for a message and a "Commit" button. I typed "First Commit" in the message, then clicked the button. 
7. After clicking "Commit," the button changes to "Publish to Branch" with another comment field. I wrote "The first Publish Branch for my website." and I clicked the button. This brought me to a pull down asking if the branch should be public or private. I clicked public.
8. This saved the website files to Github and prompted me to visit the repository page where they are saved. Once there, Github prompted me to add a README file. Again, I pushed the button. This created `README.md` in the repository.
9. On the Github website, I added some content to `README.md`, clicked "Commit changes...", and clicked through the prompts. You can read that file, and see the repository [here](https://github.com/brianjasonford/Website/).
10. Back on VS Code, I synchronized the changes. This brought `README.md` onto my computer in `/Website` and made that file visible in VS Code.

With these steps complete, when I make changes in the website, I am able to sync those changes with Github to back them up. VS Code also highlights anything that is new and not synced. And, if I make any major mistakes, I am able to use Github to go back to prior versions. Or, at least I think that is true. I'm a novice. 