const MinicssExtractPlugin = require('mini-css-extract-plugin');
const OpimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FontminPlugin = require('fontmin-webpack');
const zipPulgin = require('zip-webpack-plugin');
const unit = require('../gulpTask/_unit.js');
const merge = require('webpack-merge');

module.exports = function(customizeConfig={},options={}){
    const config = {
        mode:'production',
        module:{
            rules:[
                {
                    test:/\.js/,
                    exclude: /(node_modules|bower_components)/,
                    use:[
                        {
                            loader:"babel-loader",
                            options:{
                                cacheDirectory:true
                            }
                        }
                    ]
                },
                {
                    test:/\.css$/,
                    exclude: /(node_modules|bower_components)/,
                    use:[
                        {
                            loader:MinicssExtractPlugin.loader,
                            options:{
                                publicPath:"./"
                            }
                        },
                        {
                            loader:'css-loader'
                        }
                    ]
                },
                {
                    test:/\.less$/,
                    exclude: /(node_modules|bower_components)/,
                    use:[
                        {
                            loader:MinicssExtractPlugin.loader,
                            options:{
                                publicPath:"./"
                            }
                        },
                        {
                            loader:'css-loader'
                        },
                        {
                            loader:'less-loader',
                            options:{
                                javascriptEnabled:true,
                                globalVars:options.lessGlobalVars ? options.lessGlobalVars : {}
                            }
                        }
                    ]
                },
                {
                    test:/\.(eot|ttf|woff|svg)$/,
                    exclude: /(node_modules|bower_components)/,
                    use:{
                        loader:"url-loader",
                        options:{
                            limit:1024*2,
                            name:'[name].[hash].[ext]',
                            publicPath:"./"
                        }
                    }
                }
            ]
        },
        plugins:[
            new MinicssExtractPlugin({
                filename:'iconfont.css',
                chunkFilename:'[id].css'
            }),
            new OpimizeCSSAssetsPlugin({})
        ]
    }
    if(options.useFontMin){
        config.plugins.push(
            new FontminPlugin({
                autodetect:true
            })
        );
    }
    if(options.zipName){
        console.log(options.zipName,unit.pathZip());
        config.plugins.push(
            new zipPulgin({
                filename:options.zipName,
                path:unit.pathZip(),
                exclude:[/\.js$/]
            })
        )
    }
    return merge(config,customizeConfig)
}
