import express from 'express'
import { GenerateUserTalentEval } from './handlers/GenerateUserTalentEval.js'
import { ProjectNation } from './handlers/ProjectNation.js'
import { RawDataGetter } from './handlers/RawDataGetter.js'
import { rest_api_url_map } from './rest_api_model_manager.js'
import { get_repo_pulls } from './utils/get_repo_pulls.js'

const owner = 'neverbiasu'
const repo = 'qiniu-cloud'
const location = 'london'

const router = express.Router()

// repo
router.get('/repo-summary', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.repo_summary))
})

router.get('/stars', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.stars))
})

router.get('/forks', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.forks))
})

router.get('/subscribers', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.subscribers))
})

router.get('/pulls', async (req, res) => {
    const { prs, closed_prs, merged_prs } = await get_repo_pulls('octokit', 'octokit.js')
    res.json({ prs, closed_prs, merged_prs })

    // const raw_data_getter = new RawDataGetter()
    // res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.pulls, { state: 'open' }))
})

router.get('/languages', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.languages))
})

router.get('/contributors', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.contributors))
})

router.get('/topics', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.topics))
})

router.get('/commits', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoBasisInfo(owner, repo, rest_api_url_map.commits))
})

// user
router.get('/user-info', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.username_users))
})

router.get('/followers', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.username_followers))
})

router.get('/following', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.username_following))
})

router.get('/social-accounts', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.social_accounts))
})

router.get('/repo-list', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoList(owner))
})

router.get('/readme', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    res.json(await raw_data_getter.getRepoREADME(owner, repo))
})

router.get('/user-talent-eval', async (req, res) => {
    const user_talent_eval = new GenerateUserTalentEval(owner)
    res.json(await user_talent_eval.summaryByLLM())
})

router.get('/project-nation', async (req, res) => {
    const raw_data_getter = new RawDataGetter()
    const followers = await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.username_followers)
    const followings = await raw_data_getter.getUserBasisInfo(owner, rest_api_url_map.username_following)
    const projectNation = new ProjectNation(location, followers, followings)

    // console.log('Location:', location)
    // console.log('Followers:', followers)
    // console.log('Followings:', followings)

    res.json(await projectNation.getNation())
    // console.log('Project Nation:', await projectNation.getNation(location, followers, followings))
})

export default router
