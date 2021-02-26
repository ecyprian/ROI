export class AppSettings {
  //api end points
  public static Savereport = 'api/SaveReport';
  public static Getreport = 'api/GetReports';
  public static LoadReport = 'api/LoadReport';
  /* error status and their text */
  public static noserver = 'Server is not connected';
  public static noresponse = 'No response from server';
  public static badrequest = 'This is a bad request';
  public static unauthorized = 'Server says unauthorized';
  public static forbidden = 'This request is forbidden';
  public static notfound = 'Server says not found';
  public static internalerror = 'Server encountered internal error';
  public static resourcemove = 'The requested URI has moved to different URI';
}