# Automated Website Testing Using CI/CD with GitHub Actions

**A College Assignment Project in DevOps and Cloud Computing**

---

## 1. Project Introduction and Problem Statement

### Introduction
In modern software engineering, delivering web applications reliably requires more than just writing code. High-performing engineering teams rely on **DevOps practices**, specifically **Continuous Integration (CI)**, to automate the validation of every code modification before it enters a shared codebase.

This project delivers a responsive, professional personal portfolio website and couples it with an automated **GitHub Actions CI Pipeline**. Every time a developer commits or pushes code to the repository, automated validation runners verify project structure, asset references, HTML5 syntax, and JavaScript integrity.

### Problem Statement
In traditional beginner and academic web development workflows:
- Code is tested manually and irregularly.
- Missing files, broken CSS stylesheets, or broken script tags are often discovered only after submission or during presentations.
- Syntax mistakes such as unclosed HTML tags or malformed attributes introduce visual bugs across different web browsers.
- Developers struggle with the classic problem: *"It worked on my local computer, but why does it look broken on yours?"*

### Solution
Implement an automated **Continuous Integration (CI) Quality Gate** using **GitHub Actions**. By executing real automated checks in an isolated cloud runner on every push, errors are caught within seconds with exact file and line references.

---

## 2. Project Objectives

1. **Develop a Modern Portfolio Website:** Build a clean, responsive personal portfolio website with a professional blue and white theme using HTML5, CSS3, and JavaScript.
2. **Implement Continuous Integration (CI):** Configure GitHub Actions to automatically trigger test suites on code pushes, pull requests, and manual triggers.
3. **Automate Real Quality Checks:**
   - Verify that all core project files (`index.html`, `style.css`, `script.js`, `README.md`) exist.
   - Verify that `<link>` and `<script>` asset references in `index.html` point to valid, non-empty files.
   - Run automated HTML5 syntax and structure validation using the maintained `htmlhint` engine.
   - Validate JavaScript syntax using Node.js without runtime execution.
4. **Adhere to DevOps Security Best Practices:** Implement minimal permissions (`contents: read`) and isolated virtual runners.
5. **Keep It 100% Free and Beginner-Friendly:** Avoid paid cloud subscriptions, AWS EC2, Docker, Kubernetes, Jenkins, or databases.

---

## 3. Technologies Used

| Technology | Category | Purpose in Project |
| :--- | :--- | :--- |
| **HTML5** | Web Markup | Semantic page structure (header, sections, articles, forms, footer) |
| **CSS3** | Web Styling | Professional blue & white color palette, Flexbox, Grid, animations, media queries |
| **JavaScript (ES6+)** | Client-Side Logic | Mobile navigation toggle, interactive pipeline visualizer, form validation |
| **Git** | Version Control | Distributed local version control, branch management, commit history |
| **GitHub** | Cloud Repository | Remote hosting of source code, collaboration, and webhook trigger hub |
| **GitHub Actions** | CI/CD Platform | Automated virtual runner execution on Ubuntu for automated quality testing |
| **HTMLHint** | Linter / Validator | Maintained validation tool checking HTML tags, attributes, and doctype |
| **Node.js** | Runtime Environment | Syntax verification of JavaScript files via `node --check` |

---

## 4. CI/CD Architecture & Workflow Explanation

### End-to-End Pipeline Flow

```
+---------------+     git commit      +------------+     git push      +--------------+
|   Developer   | ------------------> |  Local Git | ----------------> |    GitHub    |
| (VS Code / PC)|                     | Repository |                   |  Repository  |
+---------------+                     +------------+                   +--------------+
                                                                              |
                                                                              | Webhook Event
                                                                              v
+---------------+     Instant         +------------+     Run Tests     +--------------+
| PASS or FAIL  | <------------------ | Automated  | <---------------- | GitHub Actions|
| Notification  |     Feedback        | CI Checks  |                   | Ubuntu Runner|
+---------------+                     +------------+                   +--------------+
```

### Flow Breakdown:
1. **Developer:** Writes and edits code locally on their development machine.
2. **Git:** Tracks changes locally using staged commits (`git add`, `git commit`).
3. **GitHub:** Remote cloud repository receives the code push via `git push origin main`.
4. **GitHub Actions:** GitHub detects the push event and launches an isolated Ubuntu virtual environment specified in `.github/workflows/ci.yml`.
5. **Automated Checks:** The virtual runner executes four sequential verification gates:
   - File existence validation
   - Asset link reference check
   - HTML syntax validation (`htmlhint`)
   - JavaScript syntax check (`node --check`)
6. **Success or Failure:** If all checks pass, GitHub displays a green checkmark (**✔**). If any check fails, the pipeline halts immediately, shows a red cross (**✖**), logs the exact error, and blocks merging.

---

### Understanding CI, Continuous Delivery, and Continuous Deployment

| Concept | What It Does | Human Role | Implemented Here? |
| :--- | :--- | :--- | :--- |
| **Continuous Integration (CI)** | Automatically integrates code changes from multiple developers into a central repository and runs automated builds and tests on every push. | Developers commit code frequently; automated system validates code quality. | **YES (Core Focus of this Project)** |
| **Continuous Delivery (CD)** | Extends CI by automatically packaging tested code and staging it so it is ready for deployment to servers at any time. | A human release manager clicks a single button to approve deployment to production. | *No (Future enhancement)* |
| **Continuous Deployment (CD)** | The most advanced phase where every commit that passes all CI tests is automatically deployed directly to live production servers. | Fully automated; no human intervention required for deployment. | *No (Future enhancement)* |

> **Academic Scope Notice:** This assignment strictly implements **Continuous Integration and Automated Testing**. It does not perform automated deployment to web hosting or cloud infrastructure.

---

## 5. Folder Structure

```
devops-ci-project/
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI workflow definition
├── .gitignore              # Files and directories ignored by Git
├── index.html              # Modern, responsive portfolio web page
├── style.css               # Professional blue & white styling and responsive rules
├── script.js               # Mobile navigation, pipeline stepper & form validation
└── README.md               # Complete project documentation and viva preparation
```

### File Explanations:
- **`index.html`**: Contains semantic HTML5 markup organized into Home, About Me, Skills, Projects, DevOps Workflow, and Contact sections.
- **`style.css`**: Defines CSS variables, clean card components, responsive layouts, hover transitions, and mobile media queries.
- **`script.js`**: Pure vanilla JavaScript providing mobile menu toggling, interactive pipeline step exploration, and form validation.
- **`.gitignore`**: Prevents unnecessary operating system artifacts (`.DS_Store`, `Thumbs.db`) and editor files from cluttering Git history.
- **`.github/workflows/ci.yml`**: The declarative automation pipeline script that instructs GitHub Actions what tests to run, on what operating system, and under what conditions.

---

## 6. Instructions for Running the Website Locally

You can run the portfolio website on your local machine using any of the three methods below:

### Method A: Direct Browser Launch (Simplest)
1. Open your File Explorer (or Finder on macOS).
2. Navigate to the `devops-ci-project` folder.
3. Double-click `index.html`.
4. The website will immediately open in your default web browser (Google Chrome, Edge, Firefox).

### Method B: Using VS Code Live Server (Recommended for Development)
1. Open Visual Studio Code.
2. Click **File > Open Folder...** and select `devops-ci-project`.
3. If not already installed, install the **Live Server** extension (by Ritwick Dey) from the VS Code Extensions tab (`Ctrl + Shift + X`).
4. Right-click on `index.html` in the explorer sidebar and click **Open with Live Server**.
5. The website opens at `http://127.0.0.1:5500/index.html` with instant live reload upon saving edits.

### Method C: Using Python Built-in HTTP Server
If Python is installed on your computer:
```bash
# Navigate to the project directory
cd devops-ci-project

# Start a local HTTP server on port 8000
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000`

---

## 7. Git Installation and Basic Commands

### Installing Git
- **Windows:** Download and install from [git-scm.com](https://git-scm.com/). During setup, choose "Git from the command line and also from 3rd-party software".
- **macOS:** Open Terminal and type `xcode-select --install` or install via Homebrew: `brew install git`.
- **Linux (Ubuntu/Debian):** Run `sudo apt update && sudo apt install git -y`.

### First-Time Git Configuration
Open your terminal (PowerShell, Command Prompt, or Bash) and set your identity:
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
Verify the installation:
```bash
git --version
```

### Essential Git Commands Reference
| Command | What It Does |
| :--- | :--- |
| `git init` | Initializes a new local Git repository in the current folder |
| `git status` | Displays the state of working directory and staged files |
| `git add .` | Stages all new, modified, and deleted files for commit |
| `git commit -m "message"` | Saves a snapshot of staged changes with a descriptive message |
| `git branch -M main` | Renames the current default branch to `main` |
| `git remote add origin <URL>` | Connects your local repository to a remote GitHub repository |
| `git push -u origin main` | Uploads local commits to the remote repository on GitHub |
| `git pull origin main` | Fetches and merges updates from the remote repository to local |

---

## 8. Instructions for Creating a GitHub Repository

1. Open your browser and log in to [github.com](https://github.com/). (If you do not have an account, click **Sign up** to create a free account).
2. In the top-right corner, click the **`+`** icon and select **New repository**.
3. Fill in the repository details:
   - **Repository name:** `devops-ci-project` (or any name you prefer).
   - **Description:** `Automated Website Testing Using CI/CD with GitHub Actions - College Assignment`.
   - **Visibility:** Select **Public** (required for free GitHub Actions minutes on public repos).
   - **Initialize this repository with:** **Do NOT** check "Add a README file", "Add .gitignore", or "Choose a license" (we already created these files locally).
4. Click the green **Create repository** button.
5. GitHub will display a page with your new repository URL (e.g., `https://github.com/your-username/devops-ci-project.git`). Keep this page open.

---

## 9. Commands for Uploading the Project to GitHub

Open PowerShell or Command Prompt, navigate into the `devops-ci-project` folder, and run the following commands in sequence:

```bash
# 1. Navigate into the project folder
cd devops-ci-project

# 2. Initialize a local Git repository
git init

# 3. Stage all project files
git add .

# 4. Create the initial commit
git commit -m "feat: initial commit for automated website testing project"

# 5. Set the default branch name to main
git branch -M main

# 6. Link your local repository to your remote GitHub repository
# (Replace YOUR_USERNAME and YOUR_REPO with your actual GitHub username and repository name)
git remote add origin https://github.com/YOUR_USERNAME/devops-ci-project.git

# 7. Push your code to GitHub
git push -u origin main
```

*(Note: When prompted, authenticate with your GitHub credentials or Personal Access Token).*

---

## 10. How to Run and Monitor GitHub Actions

### Automatic Execution
1. As soon as you run `git push origin main`, GitHub automatically detects the push event.
2. Open your repository on GitHub in your web browser.
3. Click on the **Actions** tab near the top of the repository page.
4. You will see a workflow run named **"Automated Website Testing CI"** with your commit message.
5. Click on the workflow run to view the execution live.
6. Click on the **Code Quality & Integrity Gate** job to view each step expand and execute in real time.
7. Once finished, a **green checkmark (✔)** confirms that all tests passed.
8. Scroll to the bottom of the summary page to view the **Automated Testing CI Pipeline Summary** table.

### Manual Execution (`workflow_dispatch`)
1. In your GitHub repository, click on the **Actions** tab.
2. In the left sidebar, click on **Automated Website Testing CI**.
3. You will see a banner on the right with a **Run workflow** dropdown button.
4. Click **Run workflow**, choose branch `main`, and click the green **Run workflow** button.
5. Refresh the page after 3 seconds to observe the triggered run.

---

## 11. How to Test the Workflow by Changing a File

To demonstrate the CI pipeline for your college faculty or evaluator, you should showcase both a **passing test** and a **failing test**.

### Scenario A: Testing a Successful Build (Green ✔)
1. Open `index.html` in your text editor.
2. Find the hero section subtitle or about section text and add your own name or college name:
   ```html
   <p class="hero-subtitle">
       Updated by Alex for Semester DevOps Practical Evaluation.
   </p>
   ```
3. Save the file.
4. Stage, commit, and push the change:
   ```bash
   git add index.html
   git commit -m "test: update hero subtitle text"
   git push origin main
   ```
5. Go to the **Actions** tab on GitHub:
   - The workflow triggers automatically.
   - All 4 verification steps pass.
   - A green checkmark appears.

---

### Scenario B: Testing a Pipeline Failure (Red ✖)
This test proves to your examiner that your pipeline is a real quality gate that catches bugs rather than a fake script.

1. Open `index.html` in your text editor.
2. Introduce an intentional syntax error by adding an unclosed HTML tag at the bottom of the file right before `</body>`:
   ```html
   <!-- INTENTIONAL SYNTAX ERROR FOR TESTING CI FAILURE -->
   <div class="unclosed-broken-tag">
   ```
3. Save the file.
4. Commit and push the broken code:
   ```bash
   git add index.html
   git commit -m "test: introduce unclosed tag to test CI failure"
   git push origin main
   ```
5. Go to the **Actions** tab on GitHub:
   - Notice the workflow icon turns into a **red cross (✖)**.
   - Click on the failed run and open **Step 3: RUNNING HTML5 SYNTAX & STRUCTURE LINTER**.
   - Notice HTMLHint outputs an explicit error message pointing to the unclosed tag with line number:
     ```
     Tag must be paired, missing: [ </div> ], start tag match failed on line ...
     ```
   - Notice the workflow stopped execution immediately and marked the build as failed.

---

### Scenario C: Fixing the Failure and Restoring Build Health
1. Open `index.html` and remove the broken `<div class="unclosed-broken-tag">` line.
2. Save the file.
3. Commit and push the fix:
   ```bash
   git add index.html
   git commit -m "fix: remove broken tag and restore build stability"
   git push origin main
   ```
4. Check GitHub Actions:
   - The build turns green (**✔**) again!

---

## 12. Common Errors and Solutions

| Error Message / Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| `fatal: not a git repository` | Git has not been initialized in the directory. | Run `git init` inside the `devops-ci-project` folder. |
| `fatal: remote origin already exists` | The remote repository URL was already registered. | Run `git remote set-url origin <NEW_URL>` or check existing remotes with `git remote -v`. |
| `error: failed to push some refs` | Remote repository has changes not present locally (e.g. README created on GitHub). | Run `git pull origin main --rebase` and then run `git push origin main`. |
| Workflow does not trigger upon push | The local branch is named `master` while workflow watches `main`. | Run `git branch -M main` and push using `git push -u origin main`. |
| Workflow YAML indentation error | YAML requires spaces, not tabs, for indentation. | Verify indentation in `.github/workflows/ci.yml` uses 2 spaces per indentation level. |
| GitHub Actions permission denied | Missing permission block in workflow YAML. | Include `permissions: contents: read` at the top level of `ci.yml`. |

---

## 13. Advantages, Limitations, and Future Enhancements

### Advantages
- **Immediate Feedback Loop:** Developers know within 30 seconds if a commit broke HTML structure or asset links.
- **Cost-Free:** Utilizes GitHub's free tier for public repositories with zero hosting or server bills.
- **No Complex Infrastructure:** Eliminates the need for maintaining dedicated Jenkins servers, Docker containers, or Kubernetes clusters.
- **Automated Quality Gate:** Prevents broken code from being merged into production branches.

### Limitations
- **No Automated Deployment:** This project implements Continuous Integration only; web hosting deployment must currently be initiated separately.
- **Static Testing Only:** Tests validate syntax and reference integrity; they do not perform full browser rendering or end-to-end user journey tests (such as Playwright or Selenium).

### Future Enhancements
1. **Continuous Deployment (CD):** Add an automated deployment step to GitHub Pages or AWS S3 once all CI checks pass.
2. **CSS Linting:** Integrate `stylelint` to validate CSS properties and prevent duplicate selectors.
3. **Automated Accessibility Testing:** Integrate Lighthouse CI or `axe-core` to check WCAG compliance scores automatically.
4. **Slack/Discord Webhook Notifications:** Send instant chat alerts to the developer team when builds pass or fail.

---

## 14. Conclusion for College Assignment

This project successfully demonstrates the foundational principles of **DevOps and Continuous Integration**. By integrating a responsive portfolio web application with **GitHub Actions**, the development lifecycle is transformed from manual, error-prone verification into an automated, reproducible quality gate. 

The implementation proves that automated testing can be implemented with lightweight, free, and standard web technologies—ensuring high code quality, consistency, and early defect prevention.

---

## 15. 10 Viva Questions and Answers

### Q1: What is CI/CD in DevOps?
**Answer:** CI/CD stands for **Continuous Integration and Continuous Delivery / Deployment**. It is a DevOps practice that automates the steps in software delivery, such as building, testing, and deploying code, so teams can release reliable software faster and with fewer bugs.

### Q2: What is the main difference between Continuous Delivery and Continuous Deployment?
**Answer:** In **Continuous Delivery**, code changes that pass all automated tests are automatically staged and ready for release, but deployment to production requires manual human approval. In **Continuous Deployment**, the release to production is fully automated with zero human intervention once tests pass.

### Q3: What is GitHub Actions?
**Answer:** GitHub Actions is a continuous integration and continuous delivery (CI/CD) platform built directly into GitHub. It allows developers to automate build, test, and deployment workflows triggered by GitHub repository events (such as push, pull request, or issue creation).

### Q4: What is a "Workflow" and what is a "Runner" in GitHub Actions?
**Answer:** A **Workflow** is an automated configurable process defined in a YAML file inside the `.github/workflows/` directory. A **Runner** is a virtual server (e.g., Ubuntu, Windows, macOS) hosted by GitHub that boots up to execute the jobs and steps defined in the workflow.

### Q5: What triggers the workflow in this project?
**Answer:** The workflow triggers on three events specified in `ci.yml`:
1. `push` to the `main` branch.
2. `pull_request` targeting the `main` branch.
3. `workflow_dispatch` (manual one-click trigger from the GitHub Actions web interface).

### Q6: Why must `actions/checkout@v4` be the first step in the job?
**Answer:** When GitHub Actions provisions a virtual runner, the runner is an empty virtual machine. The `actions/checkout` step clones your repository's files into the runner's workspace so subsequent steps can inspect, test, and validate them.

### Q7: What is HTMLHint and why was it chosen for this project?
**Answer:** `HTMLHint` is an active, open-source static code analysis tool (linter) for HTML. It parses HTML files and checks for syntax errors, unclosed tags, duplicate IDs, missing doctypes, and invalid attributes without requiring a browser or external server.

### Q8: Why does our workflow specify `permissions: contents: read`?
**Answer:** This follows the **Principle of Least Privilege** in DevOps security. Because this CI workflow only needs to read and inspect the code files to test them, granting read-only access prevents accidental or unauthorized modifications to repository contents.

### Q9: What happens when a test step fails in GitHub Actions?
**Answer:** By default, GitHub Actions immediately stops workflow execution upon any step returning a non-zero exit code. It marks the overall job status as **Failed (Red ✖)**, records the failure logs, and blocks pull requests from being merged until the error is resolved.

### Q10: Why is this project described as Continuous Integration and not Continuous Deployment?
**Answer:** Because the automated pipeline in this project only validates and tests the code to ensure it meets quality standards (Continuous Integration). It does not automatically copy or deploy the website to a live web hosting server (Continuous Deployment).
