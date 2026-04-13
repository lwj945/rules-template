/**
 * 精简版 rename.js - 默认过滤乱名，仅加前缀
 * 功能：
 *   1. 默认过滤包含 nameclear 关键词的节点（套餐、到期、有效等）
 *   2. 为过滤后的节点添加机场名称前缀（默认前置）
 *   3. 可选 blockquic 参数
 * 用法：Sub-Store 脚本操作添加
 * 参数：
 *   name=       机场名称前缀（必需）
 *   fgf=        前缀与节点名之间的分隔符，默认为空格
 *   blockquic=on/off  控制 block-quic 字段
 * 示例：
 *   #name=MyAir&fgf=-
 */

const inArg = $arguments;
const FNAME = inArg.name == undefined ? "" : decodeURI(inArg.name);
const FGF = inArg.fgf == undefined ? " " : decodeURI(inArg.fgf);
const blockquic = inArg.blockquic == undefined ? "" : decodeURI(inArg.blockquic);

// 过滤正则
const nameclear = /(官网|套餐|到期|有效|剩余|版本|已用|过期|失联|测试|官方|网址|备用|群|TEST|客服|网站|获取|订阅|机场|下次|官址|联系|邮箱|工单|学术|USE|USED|TOTAL|EXPIRE|EMAIL)/i;

function operator(pro) {
  // 1. 默认过滤乱名
  pro = pro.filter((res) => {
    return !nameclear.test(res.name);
  });

  // 2. 添加前缀（前置）及处理 blockquic
  if (FNAME !== "") {
    for (const node of pro) {
      if (blockquic === "on") node["block-quic"] = "on";
      else if (blockquic === "off") node["block-quic"] = "off";
      else delete node["block-quic"];
      node.name = FNAME + FGF + node.name;
    }
  } else {
    // 没有 name 参数时只处理 blockquic
    for (const node of pro) {
      if (blockquic === "on") node["block-quic"] = "on";
      else if (blockquic === "off") node["block-quic"] = "off";
      else delete node["block-quic"];
    }
  }

  return pro;
}