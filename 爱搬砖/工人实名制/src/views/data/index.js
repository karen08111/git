import Vue from 'vue'
import axios from '../../axios'

Vue.prototype.$http = axios
const workType = axios.get('/publicFunction/classify').then(res => {
  return res.data.data
})
// 参建单位类型字典表
export const enterType = [
  { id: '001', title: '专业分包' },
  { id: '002', title: '设备分包' },
  { id: '003', title: '材料分包' },
  { id: '004', title: '后勤服务' },
  { id: '005', title: '特殊设备' },
  { id: '006', title: '劳务分包' },
  { id: '007', title: '监理' },
  { id: '008', title: '建设单位' },
  { id: '009', title: '总承包单位' },
  { id: '010', title: '勘察' },
  { id: '011', title: '设计单位' },
  { id: '012', title: '其它' }
]
// 银行数据
export const bankData = {
  '001': '银联商务（收单）',
  '100': '中国邮政储蓄银行（收单）',
  '102': '中国工商银行',
  '103': '中国农业银行',
  '104': '中国银行',
  '105': '中国建设银行',
  '201': '国家开发银行',
  '202': '中国进出口银行',
  '203': '中国农业发展银行',
  '301': '交通银行',
  '302': '中信银行',
  '303': '中国光大银行',
  '304': '华夏银行',
  '305': '中国民生银行',
  '306': '广东发展银行',
  '307': '深圳发展银行',
  '308': '招商银行',
  '309': '兴业银行',
  '310': '上海浦东发展银行',
  '311': '上海银联商务/东莞商业银行',
  '313': '城市商业银行',
  '314': '农村商业银行（江苏）',
  '315': '恒丰银行',
  '316': '浙商银行',
  '317': '农村合作银行',
  '318': '渤海银行股份有限公司',
  '319': '徽商银行股份有限公司',
  '320': '镇银行有限责任公司',
  '401': '城市信用社',
  '402': '农村信用社（含北京农村商业银行）、东莞农信',
  '403': '中国邮政储蓄银行（代收付）',
  '501': '汇丰银行',
  '502': '东亚银行',
  '503': '南洋商业银行',
  '504': '恒生银行(中国)有限公司',
  '505': '中国银行（香港）有限公司',
  '506': '集友银行有限公司',
  '507': '创兴银行有限公司',
  '509': '星展银行（中国）有限公司',
  '510': '永亨银行（中国）有限公司',
  '512': '永隆银行',
  '531': '花旗银行（中国）有限公司',
  '532': '美国银行有限公司',
  '533': '摩根大通银行(中国)有限公司',
  '561': '三菱东京日联银行(中国）有限公司',
  '563': '日本三井住友银行股份有限公司',
  '564': '瑞穗实业银行（中国）有限公司',
  '565': '日本山口银行股份有限公司',
  '591': '韩国外换银行股份有限公司',
  '593': '友利银行(中国)有限公司',
  '594': '韩国产业银行',
  '595': '新韩银行(中国)有限公司',
  '596': '韩国中小企业银行有限公司',
  '597': '韩亚银行（中国）有限公司',
  '621': '华侨银行（中国）有限公司',
  '622': '大华银行（中国）有限公司',
  '623': '星展银行（中国）有限公司',
  '631': '泰国盘谷银行(大众有限公司)',
  '641': '奥地利中央合作银行股份有限公司',
  '651': '比利时联合银行股份有限公司',
  '652': '比利时富通银行有限公司',
  '661': '荷兰银行',
  '662': '荷兰安智银行股份有限公司',
  '671': '渣打银行',
  '672': '英国苏格兰皇家银行公众有限公司',
  '691': '法国兴业银行（中国)有限公司',
  '694': '法国东方汇理银行股份有限公司',
  '695': '法国外贸银行股份有限公司',
  '711': '德国德累斯登银行股份公司',
  '712': '德意志银行（中国）有限公司',
  '713': '德国商业银行股份有限公司',
  '714': '德国西德银行股份有限公司',
  '715': '德国巴伐利亚州银行',
  '716': '德国北德意志州银行',
  '732': '意大利联合圣保罗银行股份有限公司',
  '741': '瑞士信贷银行股份有限公司',
  '742': '瑞士银行',
  '751': '加拿大丰业银行有限公司',
  '752': '加拿大蒙特利尔银行有限公司',
  '761': '澳大利亚和新西兰银行集团有限公司',
  '771': '摩根士丹利国际银行（中国）有限公司',
  '775': '联合银行(中国)有限公司',
  '776': '荷兰合作银行有限公司',
  '781': '厦门国际银行',
  '782': '法国巴黎银行（中国）有限公司',
  '785': '华商银行',
  '787': '华一银行',
  '897': '广东农村信用合作社（收单）',
  '898': '银联商务（收单）',
  '969': '(澳门地区)银行',
  '989': '(香港地区)银行'
}
// 工人进退场
export const workCheck = [
  { id: 1, title: '进场' },
  { id: 0, title: '退场' }
]
// 计量单位类型字典表
export const unit = [
  { id: '80', title: '米' },
  { id: '81', title: '平方米' },
  { id: '82', title: '立方米' }
]
// 性别字典表
export const gender = [
  { id: 1, title: '男' },
  { id: 0, title: '女' }
]
// 培训类型
export const trainingTypeCode = [
  {
    id: '003001',
    title: '安全教育'
  },
  {
    id: '003002',
    title: '入场教育'
  },
  {
    id: '003003',
    title: '退场教育'
  },
  {
    id: '003004',
    title: '技能培训'
  }
]
// 政治面貌字典表
export const politics = [
  { id: '01', title: '中共党员' },
  { id: '02', title: '中共预备党员' },
  { id: '03', title: '共青团员' },
  { id: '04', title: '民革党员' },
  { id: '05', title: '民盟盟员' },
  { id: '06', title: '民建会员' },
  { id: '07', title: '民进会员' },
  { id: '08', title: '农工党党员' },
  { id: '09', title: '致公党党员' },
  { id: '10', title: '九三学社社员' },
  { id: '11', title: '台盟盟员' },
  { id: '12', title: '无党派人士' },
  { id: '13', title: '群众' }
]
// 文化程度字典表
export const culture = [
  { id: '01', title: '小学' },
  { id: '02', title: '初中' },
  { id: '03', title: '高中' },
  { id: '04', title: '中专' },
  { id: '05', title: '大专' },
  { id: '06', title: '本科' },
  { id: '07', title: '硕士' },
  { id: '08', title: '博士' },
  { id: '99', title: '其他' }
]
// 婚姻状况字典表
export const marriage = [
  { id: '01', title: '未婚' },
  { id: '02', title: '已婚' },
  { id: '03', title: '离异' },
  { id: '04', title: '丧偶' }
]
// 人员证书种类字典表
export const Personnel = [
  { id: '1', title: '职业技能证' },
  { id: '2', title: '安装证' },
  { id: '3', title: '岗位证' },
  { id: '4', title: '职称证' },
  { id: '5', title: '职业注册证' },
  { id: '6', title: '其它' }
]
// 人员证书类型：岗位证书专业字典表
export const PersonnelPost = [
  { id: '014002001', title: '房屋建筑' },
  { id: '014002002', title: '市政公用工程' },
  { id: '014002003', title: '土建' },
  { id: '014002004', title: '电气' },
  { id: '014002005', title: '水暖' },
  { id: '014002006', title: '不分专业' },
  { id: '014002007', title: '安装' },
  { id: '014002008', title: '建筑工程' },
  { id: '014002009', title: '公路工程' },
  { id: '014002010', title: '机电工程' },
  { id: '014002011', title: '水利水电工程' }
]
// 人员证书类型：执业注册类别字典表
export const ProfessionalCertificate = [
  { id: 1, title: '一级注册建筑师' },
  { id: 2, title: '二级注册建筑师' },
  { id: 3, title: '一级注册结构工程师' },
  { id: 4, title: '二级注册结构师' },
  { id: 5, title: '注册土木工程师（岩土）' },
  { id: 6, title: '注册土木工程师（港口与航道工程）' },
  { id: 7, title: '注册公用设备工程师（暖通空调）' },
  { id: 8, title: '注册公用设备工程师（给水排水）' },
  { id: 9, title: '注册公用设备工程师（动力）' },
  { id: 10, title: '注册电气工程师（发输变电）' },
  { id: 11, title: '注册电气工程师（供配电）' },
  { id: 12, title: '注册化工工程师' },
  { id: 13, title: '注册建造师（一级）' },
  { id: 14, title: '注册建造师（二级）' },
  { id: 15, title: '注册监理工程师' },
  { id: 16, title: '造价工程师' },
  { id: 17, title: '注册建造师（一级临时）' },
  { id: 18, title: '注册建造师（二级临时）' },
  { id: 19, title: '注册环保工程师' },
  { id: 20, title: '注册城市规划师' },
  { id: 21, title: '房地产经纪人' },
  { id: 22, title: '注册房地产估价师' },
  { id: 23, title: '物业管理师' },
  { id: 24, title: '园林项目经理' },
  { id: 25, title: '招标师' },
  { id: 26, title: '一级注册消防工程师' },
  { id: 27, title: '注册机械工程师' },
  { id: 28, title: '一级防护工程师' },
  { id: 29, title: '建造员（三级项目经理）' }
]
// 人员资质等级：职称等级
export const professional = [
  { id: 1, title: '初级职称' },
  { id: 2, title: '中级职称' },
  { id: 3, title: '高级职称' }
]
// 资质证书状态字典表
export const aptitudeStatus = [
  { id: 1, title: '有效' },
  { id: 2, title: '注销' },
  { id: 3, title: '暂扣' },
  { id: 4, title: '过期' }
]
// 项目状态字典
export const projectStatus = [
  { id: '001', title: '筹备' },
  { id: '002', title: '立项' },
  { id: '003', title: '在建' },
  { id: '004', title: '完工' },
  { id: '005', title: '停工' }
]
// 立项级别字典表
export const topLevel = [
  { id: '001', title: '部级' },
  { id: '002', title: '省级' },
  { id: '003', title: '地市级' },
  { id: '004', title: '区县级' },
  { id: '005', title: '国家级' },
  { id: '006', title: '其他' }
]
// 建设规模字典表
export const construction = [
  { id: '01', title: '大型' },
  { id: '02', title: '中型' },
  { id: '03', title: '小型' }
]
// 建设性质分类字典表
export const ConstructionClassification = [
  { id: '001', title: '新建' },
  { id: '002', title: '改建' },
  { id: '003', title: '扩建' },
  { id: '004', title: '恢复' },
  { id: '005', title: '迁建' },
  { id: '006', title: '拆除' },
  { id: '099', title: '其他' }
]
// 工程用途字典表
export const EngineeringPurposes = [
  { id: '100', title: '居住建筑' },
  { id: '200', title: '居住建筑配套工程' },
  { id: '300', title: '公共建筑' },
  { id: '301', title: '办公建筑' },
  { id: '302', title: '商业建筑' },
  { id: '303', title: '旅游建筑' },
  { id: '304', title: '科教文卫建筑' },
  { id: '305', title: '交通运输类' },
  { id: '306', title: '通信建筑' },
  { id: '307', title: '公共建筑配套工程' },
  { id: '400', title: '商住楼' },
  { id: '500', title: '农业建筑' },
  { id: '600', title: '农业建筑配套工程' },
  { id: '700', title: '工业建筑' },
  { id: '800', title: '工业建筑配套工程' },
  { id: '999', title: '其他' },
  { id: '010', title: '给水' },
  { id: '011', title: '排水' }
]
// 市场主体类别字典表
export const LongBody = [
  { id: 1, title: '建设单位' },
  { id: 2, title: '勘察' },
  { id: 3, title: '设计' },
  { id: 4, title: '施工' },
  { id: 5, title: '监理' }
]
// 认定部门级别字典表
export const ThatDepartment = [
  { id: 1, title: '国家级' },
  { id: 2, title: '省级' },
  { id: 3, title: '市级' },
  { id: 4, title: '区县级' }
]
// 职业技能等级
export const OccupationalSkillLevel = [
  { id: 1, title: '普工' },
  { id: 2, title: '初级工' },
  { id: 3, title: '中级工' },
  { id: 4, title: '高级工' },
  { id: 5, title: '技师' },
  { id: 6, title: '高级技师' }
]
// 是否字典表
export const whether = [
  { id: 0, title: '否' },
  { id: 1, title: '是' }
]
// 合同期限类型字典表
export const termOfContract = [
  { id: 0, title: '固定期限合同' },
  { id: 1, title: '以完成一定工作为期限的合同' }
]
// 项目分类字典表
export const projectClass = [
  { id: '01', title: '房屋建筑工程' },
  { id: '02', title: '市政公用工程' },
  { id: '03', title: '机电安装工程' },
  { id: '04', title: '铁路工程' },
  { id: '05', title: '公路工程' },
  { id: '06', title: '港口与航道工' },
  { id: '07', title: '水利水电工程' },
  { id: '08', title: '电力工程' },
  { id: '09', title: '矿山工程' },
  { id: '10', title: '冶炼工程' },
  { id: '11', title: '化工石油工程' },
  { id: '12', title: '通信工程' },
  { id: '99', title: '其他' }
]
// 单位性质
export const natureOfUnit = [
  { id: '110', title: '国有企业' },
  { id: '120', title: '集体企业' },
  { id: '130', title: '股份合作企业' },
  { id: '140', title: '联营企业' },
  { id: '141', title: '国有联营企业' },
  { id: '142', title: '集体联营企业' },
  { id: '143', title: '国有与集体联营企业' },
  { id: '149', title: '其他联营企业' },
  { id: '150', title: '有限责任公司' },
  { id: '151', title: '国有独资公司' },
  { id: '159', title: '其他有限责任公司' },
  { id: '160', title: '股份有限公司' },
  { id: '170', title: '私营企业' },
  { id: '171', title: '私营独资企业' },
  { id: '172', title: '私营合伙企业' },
  { id: '173', title: '私营有限责任公司' },
  { id: '174', title: '私营股份有限公司' },
  { id: '190', title: '其他企业' },
  { id: '210', title: '合资经营企业（港或澳、台资）' },
  { id: '220', title: '合作经营企业（港或澳、台资）' },
  { id: '230', title: '港、澳、台商独资经营企业' },
  { id: '240', title: '港、澳、台商投资股份有限公司' },
  { id: '290', title: '其他港、澳、台商投资企业' },
  { id: '310', title: '中外合资经营企业' },
  { id: '320', title: '中外合作经营企业' },
  { id: '330', title: '外资企业' },
  { id: '340', title: '外商投资股份有限公司' },
  { id: '390', title: '其他外商投资企业' }
]
// 奖励类别
export const RewardCategory = [
  { id: 1, title: '比赛获奖' },
  { id: 2, title: '优秀工人' },
  { id: 3, title: '道德标兵' }
]
// 奖励级别
export const RewardLevel = [
  { id: 1, title: '国家级' },
  { id: 2, title: '省部级' },
  { id: 3, title: '地市级' },
  { id: 4, title: '企业级' }
]
// 班组列表
export const TeamList = function (id) {
  return axios.get('/member/teamclass/teamLists/' + id).then(res => {
    return res.data.data
  })
}
// 工人列表
// export const workList = function (val) {
//   return axios.get('/member/teamclassWorkers/notPagelists/', { params: val }).then(res => {
//     return res.data.data
//   })
// }
export const workList = function (val) {
  return axios.get('/member/teamclassWorkers/notPagelists/' + val).then(res => {
    return res.data.data
  })
}
// 惩罚事项
export const PunishmentList = [
  { id: '01', title: '打架斗殴' },
  { id: '02', title: '酗酒偷盗' },
  { id: '03', title: '恶意讨薪' },
  { id: '04', title: '破坏公共财产' },
  { id: '05', title: '扰乱秩序' },
  { id: '06', title: '不服从管理' },
  { id: '07', title: '其它' }
]
// 惩罚级别
export const PunishmentLeval = [
  { id: '01', title: '一般' },
  { id: '02', title: '严重' },
  { id: '03', title: '非常严重' }
]
// 年龄
export const ageList = [
  {
    id: 1,
    title: '18岁以下'
  }, {
    id: 2,
    title: '18-29'
  }, {
    id: 3,
    title: '30-39'
  }, {
    id: 4,
    title: '40-49'
  }, {
    id: 5,
    title: '50-55'
  }, {
    id: 6,
    title: '55以上'
  }
]
// 银行字典
export const bankList = [
  { id: '1', title: '中国银行' },
  { id: '2', title: '中国工商银行' },
  { id: '3', title: '中国建设银行' },
  { id: '4', title: '中国农业银行' }
]
export const uploadFileType = [
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
]
export default {
  workType: workType,
  PersonnelPost, // 人员证书类型：岗位证书专业字典表
  Personnel, // 人员证书种类字典表
  marriage, // 婚姻状况字典表
  culture, // 文化程度字典表
  politics, // 政治面貌字典表
  unit, // 计量单位类型字典表
  gender, // 性别字典表
  workCheck, // 工人进退场
  enterType, // 参建单位类型字典表
  ProfessionalCertificate, // 人员证书类型：执业注册类别字典表
  professional, // 职称等级
  aptitudeStatus, // 资质证书状态字典表
  projectStatus, // 项目状态
  topLevel, // 立项级别字典表
  construction, // 建设规模字典表
  ConstructionClassification, // 建设性质分类字典表
  EngineeringPurposes, // 工程用途字典表
  LongBody, // 市场主体类别字典表
  ThatDepartment, // 认定部门级别字典表
  OccupationalSkillLevel, // 职业技能等级
  whether, // 是否字典
  termOfContract, // 合同期限类型字典表
  projectClass, // 项目分类
  natureOfUnit, // 单位性质
  RewardCategory, // 奖励类别
  RewardLevel, // 奖励级别
  TeamList, // 班组列表
  workList, // 工人列表
  PunishmentList, // 惩罚事项列表
  PunishmentLeval, // 惩罚级别
  ageList, // 年龄列表
  bankList // 银行字典
}
