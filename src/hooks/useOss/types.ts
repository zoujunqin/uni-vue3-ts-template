export type OssUploadConfig = {
  /**
   * 限制上传的文件前缀
   */
  dir?: string;
  /**
   * 指定的Policy过期时间，格式为Unix时间戳
   */
  expire?: string;
  /**
   * 用户发送上传请求的域名
   */
  host?: string;
  /**
   * 服务端生成的key
   */
  key?: string;
  accessid?: string;
  /**
   * 用户表单上传的策略（Policy）Policy为经过Base64编码过的字符串
   */
  policy?: string;
  /**
   * 对Policy签名后的字符串
   */
  signature?: string;
};

/**
 * 临时凭证
 *  */
export type OSSCredentialConfig = {
  regionId?: String;
  accessKeyId?: String;
  accessKeySecret?: String;
  securityToken?: String;
  bucketName?: String;
  expiration?: number;
};

//  FD("fd", "财务模块"),
//   FLOW("flow", "工作流模块"),
//   PLATFORM("platform", "租户平台模块"),
//   si("si", "社保模块"),
//   ST("st", "薪税模块"),
//   SYSTEM("system", "系统模块"),
//   UOM("uom", "基础服务"),
//   TEMP("temp", "临时模块");
/* 模块类型 */
export type ModuleType =
  | 'fd'
  | 'flow'
  | 'platform'
  | 'si'
  | 'st'
  | 'system'
  | 'uom'
  | 'temp'
  | 'fe';
